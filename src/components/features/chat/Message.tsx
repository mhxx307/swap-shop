import { Image } from '@/components/shared';
import { Message } from '@/generated/graphql';
import ImageViewer from 'react-simple-image-viewer';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import TimeAgo from 'timeago-react';

interface MessageProps {
    own?: boolean;
    message: Message;
}

function Message({ own, message }: MessageProps) {
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
                                        src={message.images as any}
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
                <img
                    className="mr-4 h-[32px] w-[32px] rounded-full object-cover"
                    src={
                        message.sender.avatar
                            ? message.sender.avatar
                            : '/images/avatar-fallback.png'
                    }
                    alt={message.id}
                />
                <p
                    className={classNames(
                        'max-w-[300px] rounded-md  p-[10px]',
                        {
                            'bg-[#1877f2] text-white': !own,
                            'bg-[#f5f1f1] text-black': own,
                        },
                    )}
                >
                    {message.text}
                </p>
            </div>
            {/* message bottom */}
            <div className="mt-[10px] text-xs">
                <TimeAgo datetime={message.createdDate} />
            </div>
        </div>
    );
}

export default Message;
