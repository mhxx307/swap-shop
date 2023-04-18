import ImageViewer from 'react-simple-image-viewer';
import classNames from 'classnames';
import { useCallback, useRef, useState } from 'react';
import TimeAgo from 'timeago-react';
import { AiOutlineMore } from 'react-icons/ai';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import { Image, Popover } from '@/components/shared';
import {
    Message,
    useMeQuery,
    useRemoveMessageMutation,
} from '@/generated/graphql';
import { useMessage } from '@/hooks';
import { toast } from 'react-toastify';
// import { useAuthContext } from '@/contexts/AuthContext';

interface MessageProps {
    own?: boolean;
    message: Message;
    socket: any;
}

function Message({ own, message, socket }: MessageProps) {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const openImageViewer = useCallback((index: number) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    return (
        <div
            className={classNames('mt-[20px] flex flex-col', {
                'mr-4 items-end': own,
            })}
        >
            {message.images && (
                <div className="mb-1 flex w-[300px] flex-wrap">
                    {message.images.map((image, index) => {
                        return (
                            <div
                                key={message.id}
                                className={`aspect-[4/1] w-[47%] p-1 ${
                                    message.images?.length === 1 && 'flex-1'
                                }`}
                            >
                                <Image
                                    className="  h-[47%] flex-1 cursor-pointer rounded-lg border-[2px] border-gray-50 object-cover"
                                    alt="imageChat"
                                    src={image}
                                    onClick={() => openImageViewer(index)}
                                ></Image>

                                {isViewerOpen && (
                                    <ImageViewer
                                        src={message.images as string[]}
                                        currentIndex={currentImage}
                                        disableScroll={false}
                                        closeOnClickOutside={true}
                                        onClose={closeImageViewer}
                                        closeComponent={<></>}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
            {/* message top */}
            <div className="mr-[10px] flex">
                {!own && (
                    <img
                        className="mr-4 h-[32px] w-[32px] rounded-full object-cover"
                        src={
                            message.sender.avatar
                                ? message.sender.avatar
                                : '/images/avatar-fallback.png'
                        }
                        alt={message.id}
                    />
                )}

                <Popover
                    renderPopover={
                        own ? (
                            <MessageOptions message={message} socket={socket} />
                        ) : (
                            <></>
                        )
                    }
                    isArrow={false}
                    placement={own ? 'left-start' : 'right-start'}
                >
                    <p
                        className={classNames(
                            'max-w-[300px] rounded-md p-[8px]',
                            {
                                'bg-[#1877f2] text-white': !own,
                                'bg-[#f5f1f1] text-black': own,
                            },
                        )}
                    >
                        {message.text}
                    </p>
                </Popover>
            </div>
            {/* message bottom */}
            <div className="mt-[10px] text-xs">
                <TimeAgo datetime={message.createdDate} />
            </div>
        </div>
    );
}

export default Message;

const MessageOptions = ({
    message,
    socket,
}: {
    message: Message;
    socket: any;
}) => {
    const optionRef = useRef<HTMLSpanElement | null>(null);
    return (
        <Tippy
            interactive={true}
            render={(attrs) => (
                <div tabIndex={-1} {...attrs}>
                    <MoreOptions message={message as Message} socket={socket} />
                </div>
            )}
            trigger="click"
            animation={false}
            offset={[28, 20]}
            placement="top-end"
        >
            <span ref={optionRef}>
                {' '}
                <AiOutlineMore className="fill-black-500 h-6 w-6 cursor-pointer dark:fill-gray-500" />
            </span>
        </Tippy>
    );
};

const MoreOptions = ({
    message,
    socket,
}: {
    message: Message;
    socket: any;
}) => {
    // const { profile } = useAuthContext();
    const { data: meData } = useMeQuery();
    const profile = meData?.me;
    const { refetch } = useMessage();
    const [removeMessage] = useRemoveMessageMutation();

    const receiverId =
        message?.conversation?.member1?.id === profile?.id
            ? message?.conversation?.member2?.id
            : message?.conversation?.member1?.id;

    console.log('receiverId', receiverId);
    console.log('message', message);

    const handleRemoveMessage = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        e.preventDefault();
        await removeMessage({
            variables: {
                messageId: message.id,
            },
            onCompleted: () => {
                refetch();
                if (socket.current && profile) {
                    socket.current.emit('sendMessage', {
                        senderId: profile.id,
                        receiverId: receiverId,
                        text: 'Tin nhắn đã được thu hồi',
                    });
                }
                toast.success('Deteled Successfully');
            },
        });
    };

    return (
        <div className="bg-white shadow dark:bg-[#e3e3]">
            <button
                className="flex-center w-[100px] p-2 text-black transition-colors hover:bg-gray-200 dark:text-white"
                onClick={handleRemoveMessage}
            >
                Xóa, gỡ bỏ
            </button>
        </div>
    );
};
