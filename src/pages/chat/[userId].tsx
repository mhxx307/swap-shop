import {
    useInsertMessageMutation,
    useMeQuery,
    usePushPrivateNotificationMutation,
} from '@/generated/graphql';

import { BsEmojiSmile } from 'react-icons/bs';
import { MdSend } from 'react-icons/md';
import { FiMapPin } from 'react-icons/fi';
import ReactTextareaAutosize from 'react-textarea-autosize';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import Tippy from '@tippyjs/react/headless';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import { Message } from '@/components/features/chat';
import { ImageChatUpload } from '@/components/features/uploads';
import { ChatLayout } from '@/components/layouts';
import { Button, Image } from '@/components/shared';
import { Message as MessageType } from '@/generated/graphql';
import { createUrlListFromFileList, formatCurrency } from '@/utils';
import { useMessage } from '@/hooks';
import { useForm } from 'react-hook-form';

import 'tippy.js/dist/tippy.css';
import { useAppContext } from '@/contexts/AppContext';
import dynamic from 'next/dynamic';
import { clearLS, setIsShowMapToLS } from '@/utils/auth';

function ChatBox() {
    const { conversationData, messagesData } = useMessage();
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [files, setFiles] = useState<File[]>([]);
    const { register, handleSubmit, setValue, getValues } = useForm({
        defaultValues: { message: '' },
    });
    const { data: meData } = useMeQuery();
    const [pushPrivateNotificationMutation] =
        usePushPrivateNotificationMutation();
    const [sendMessageMutation, { loading: sendMessageLoading }] =
        useInsertMessageMutation();

    const { isShowMap, setIsShowMap } = useAppContext();

    const profile = meData?.me;
    const conversation = conversationData?.getConversation;
    const messages = messagesData?.messages;
    const iconRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const id = setTimeout(() => {
            clearLS();
        }, 1000 * 60 * 5); // 5 minutes

        return () => {
            clearTimeout(id);
        };
    }, []);

    const Map = useMemo(
        () =>
            dynamic(
                () => import('../../components/shared/Map'), // replace '@components/map' with your component's location
                {
                    loading: () => <p>A map is loading</p>,
                    ssr: false, // This line is important. It's what prevents server-side render
                },
            ),
        [],
    );

    const handleSendMessage = async (payload: any) => {
        let urlChatImages: string[] = [];

        if (payload.message.trim().length === 0 && files.length === 0) {
            return;
        }

        if (files.length > 0) {
            urlChatImages = await createUrlListFromFileList(files, 'chats');
        }

        if (profile?.id && conversation?.id) {
            const receiverId =
                conversation.member1.id === profile.id
                    ? conversation.member2.id
                    : conversation.member1.id;

            await pushPrivateNotificationMutation({
                variables: {
                    content: `Bạn có tin nhắn mới: "${payload.message}"`,
                    recipientId: receiverId,
                },
            });

            await sendMessageMutation({
                variables: {
                    insertMessageInput: {
                        conversationId: conversation.id,
                        senderId: profile.id,
                        text: payload.message || null,
                        images: urlChatImages,
                    },
                },
            });
            setValue('message', '');
            setFiles([]);
        }
    };

    return (
        <>
            {/* wrapper */}
            <div className="relative flex h-full flex-col justify-between bg-[#F9F9F9] dark:bg-[#161616]">
                {conversation ? (
                    <>
                        {/* top */}
                        <div className="flex items-center justify-between border-b-[1px] border-l-[1px] border-r-[1px] bg-[#F5F1F1] px-3 pt-3 pb-5 dark:border-gray-500 dark:bg-[#343444]">
                            <p className="font-bold">Chat</p>
                        </div>
                        <div className="h-[114px] border-b-[1px] bg-[#f5f1f1] p-2 pl-4 dark:border-gray-500 dark:bg-[#343444]">
                            <p className="text-sm">
                                Bạn đang trao đổi với người bán về sản phẩm này
                            </p>
                            <div className="mt-1 h-[1px] w-full bg-black/10 dark:bg-gray-300" />
                            <div className="mt-2 flex">
                                <Image
                                    className="h-[60px] w-[100px] object-cover"
                                    src={conversation.article.thumbnail}
                                    alt={conversation.id}
                                />
                                <div className="ml-2">
                                    <p className="text-xs">
                                        {conversation.article.title}
                                    </p>
                                    <p className="text-xs text-red-500">
                                        {conversation.article.price &&
                                        conversation.article.price === '0'
                                            ? 'Free'
                                            : `đ ${formatCurrency(
                                                  Number(
                                                      conversation.article
                                                          .price,
                                                  ),
                                              )}`}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="h-[520px] overflow-y-scroll">
                            {messages &&
                                messages.map((message) => (
                                    <div ref={scrollRef} key={message.id}>
                                        <Message
                                            own={
                                                message.sender.id ===
                                                profile?.id
                                            }
                                            message={message as MessageType}
                                        />
                                    </div>
                                ))}
                            {isShowMap && profile && (
                                <div className="flex h-[47%] w-full justify-end">
                                    <Map />
                                </div>
                            )}
                        </div>

                        {/* bottom */}
                        <form
                            className="mt-[5px] flex h-[50px] items-center justify-between rounded-md bg-[#F5F1F1] px-3 dark:text-black"
                            onSubmit={handleSubmit(handleSendMessage)}
                        >
                            <Tippy
                                interactive={true}
                                render={(attrs) => (
                                    <div
                                        className="box"
                                        tabIndex={-1}
                                        {...attrs}
                                    >
                                        <EmojiPicker
                                            emojiStyle={EmojiStyle.TWITTER}
                                            onEmojiClick={(emoji) => {
                                                const value = getValues();
                                                const message =
                                                    value['message'];
                                                setValue(
                                                    'message',
                                                    message + emoji.emoji,
                                                );
                                            }}
                                        />
                                    </div>
                                )}
                                trigger="click"
                                animation={false}
                                offset={[28, 20]}
                                placement="top-start"
                            >
                                <span ref={iconRef}>
                                    {' '}
                                    <BsEmojiSmile className="cursor-pointer text-black" />
                                </span>
                            </Tippy>

                            <ImageChatUpload
                                initialFiles={files}
                                onChange={setFiles}
                                multiple
                                value={files.filter(
                                    (file, index, self) =>
                                        index ===
                                        self.findIndex(
                                            (f) => f.name === file.name,
                                        ),
                                )}
                            />

                            <FiMapPin
                                className="mr-2 cursor-pointer"
                                onClick={() => {
                                    setIsShowMap(!isShowMap);
                                    setIsShowMapToLS(!isShowMap);
                                }}
                            />

                            <ReactTextareaAutosize
                                {...register('message')}
                                minRows={1}
                                maxRows={6}
                                placeholder="Write something..."
                                className="mr-2 h-[90px] w-[80%] rounded-md border p-[4px] outline-none"
                            />
                            <Button
                                secondary
                                RightIcon={MdSend}
                                type="submit"
                                isLoading={sendMessageLoading}
                                className="text-white"
                            >
                                Send
                            </Button>
                        </form>
                    </>
                ) : (
                    <span className="absolute left-52 top-48">
                        Open a conversation to start a chat.
                    </span>
                )}
            </div>
        </>
    );
}

export default ChatBox;

// eslint-disable-next-line react/display-name
ChatBox.Layout = (page: ReactNode) => <ChatLayout>{page}</ChatLayout>;
