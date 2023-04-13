import { useMeQuery, useNewMessageMutation } from '@/generated/graphql';
import { io } from 'socket.io-client';

import { BsEmojiSmile } from 'react-icons/bs';
import { MdSend } from 'react-icons/md';
import ReactTextareaAutosize from 'react-textarea-autosize';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import Tippy from '@tippyjs/react/headless';
import { ReactNode, useEffect, useRef, useState } from 'react';

import { Message } from '@/components/features/chat';
import { ImageChatUpload } from '@/components/features/uploads';
import { ChatLayout } from '@/components/layouts';
import { Button, Image } from '@/components/shared';
import { Message as MessageType } from '@/generated/graphql';
import { createUrlListFromFileList, formatCurrency } from '@/utils';
import { useMessage } from '@/hooks';

import 'tippy.js/dist/tippy.css';

interface UserSocket {
    userId: string;
    socketId: string;
}

function ChatBox() {
    const { conversationData, messagesData, refetch, socket } = useMessage();
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [onlineUsers, setOnlineUsers] = useState<UserSocket[]>([]);
    console.log(onlineUsers);

    const { data: meData } = useMeQuery();

    const [sendMessageMutation, { loading: sendMessageLoading }] =
        useNewMessageMutation();

    const conversation = conversationData?.getConversation;
    const messages = messagesData?.messages;
    const me = meData?.me;

    const iconRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // connect to socket
    useEffect(() => {
        socket.current = io(`wss://${process.env.NEXT_PUBLIC_SOCKET_URL}`);
        console.log('Socket ID:', socket.current.id);
        console.log('socket', socket.current);

        // Listen for incoming messages
        if (socket.current) {
            console.log(socket.current);
            socket.current.on('getMessage', (data) => {
                console.log('Received message:', data);
                // Do something with the message
                refetch();
            });
        }

        return () => {
            socket.current?.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // add user and getUsers to socket
    useEffect(() => {
        if (me) {
            socket.current?.emit('addUser', me.id); // emit the addUser event with the me.id as the argument
            socket.current?.on('getUsers', (users: UserSocket[]) => {
                setOnlineUsers(users);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [me]);

    const handleSendMessage = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    ) => {
        event?.preventDefault();
        const urlChatImages = await createUrlListFromFileList(files, 'chats');

        if (me?.id && conversation?.id && newMessage) {
            const receiverId =
                conversation.member1.id === me.id
                    ? conversation.member2.id
                    : conversation.member1.id;

            await sendMessageMutation({
                variables: {
                    insertMessageInput: {
                        conversationId: conversation.id,
                        senderId: me.id,
                        text: newMessage,
                        images: urlChatImages,
                    },
                },
                onCompleted() {
                    refetch();
                    setNewMessage('');
                    setFiles([]);
                    socket.current?.emit('sendMessage', {
                        senderId: me.id,
                        receiverId: receiverId,
                        text: newMessage,
                    });
                },
            });
        }
    };

    return (
        <>
            {/* wrapper */}
            <div className="relative flex h-full flex-col justify-between">
                {conversation ? (
                    <>
                        {/* top */}

                        <div className=" mr-4 mt-2 h-[120px] rounded-lg bg-[#f5f1f1] p-2 pl-4 dark:bg-[#343444]">
                            <p className="text-sm">
                                Bạn đang trao đổi với người bán về sản phẩm này
                            </p>
                            <div className="h-[2px] w-full bg-black/10" />
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
                                            own={message.sender.id === me?.id}
                                            message={message as MessageType}
                                            socket={socket}
                                        />
                                    </div>
                                ))}
                        </div>

                        {/* bottom */}
                        <div className="mt-[5px] mb-[15px] flex items-center justify-between">
                            <Tippy
                                interactive={true}
                                render={(attrs) => (
                                    <div
                                        className="box"
                                        tabIndex={-1}
                                        {...attrs}
                                    >
                                        <EmojiPicker
                                            emojiStyle={EmojiStyle.FACEBOOK}
                                            onEmojiClick={(emoji) =>
                                                setNewMessage(
                                                    (prev) =>
                                                        prev + emoji.emoji,
                                                )
                                            }
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
                                    <BsEmojiSmile className="cursor-pointer" />
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

                            <ReactTextareaAutosize
                                minRows={1}
                                maxRows={6}
                                placeholder="Write somthing..."
                                className="h-[90px] w-[80%] border p-[10px] outline-none"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <Button
                                secondary
                                RightIcon={MdSend}
                                onClick={handleSendMessage}
                                isLoading={sendMessageLoading}
                                className="text-white"
                            >
                                Send
                            </Button>
                        </div>
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
