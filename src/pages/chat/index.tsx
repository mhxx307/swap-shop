import { ReactNode, useEffect, useRef, useState } from 'react';
import { BsFillGearFill, BsTrash } from 'react-icons/bs';
import { MdSend } from 'react-icons/md';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { io, Socket } from 'socket.io-client';

import { Conversations, Message } from '@/components/features/chat';
import { BaseLayout } from '@/components/layouts';
import { Auth, Button } from '@/components/shared';
import {
    Conversation,
    Message as MessageType,
    useGetConversationsQuery,
    useMeQuery,
    useMessagesQuery,
    useNewMessageMutation,
} from '@/generated/graphql';

function Chat() {
    const socket = useRef<Socket | null>();
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [currentChat, setCurrentChat] = useState<Conversation | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState<{
        senderId: string;
        text: string;
    }>();
    const { data: meData } = useMeQuery();
    const { data: conversationsData } = useGetConversationsQuery();
    const { data: messagesData, refetch } = useMessagesQuery({
        variables: {
            conversationId: currentChat?.id as string,
        },
        skip: !currentChat,
    });
    const [sendMessageMutation, { loading: sendMessageLoading }] =
        useNewMessageMutation();
    const me = meData?.me;
    const conversations = conversationsData?.getConversations;
    const messages = messagesData?.messages;

    // connect to socket
    useEffect(() => {
        socket.current = io('ws://localhost:8900');

        socket.current?.on(
            'getMessage',
            (data: { senderId: string; text: string }) => {
                setArrivalMessage({
                    senderId: data.senderId,
                    text: data.text,
                });
            },
        );
    }, []);

    // add user and getUsers to socket
    useEffect(() => {
        socket.current?.emit('addUser', me?.id);
        socket.current?.on(
            'getUsers',
            (
                users: {
                    userId: string;
                    socketId: string;
                }[],
            ) => {
                console.log('users', users);
            },
        );
    }, [me]);

    // get message from socket
    useEffect(() => {
        arrivalMessage &&
            (currentChat?.member1.id === arrivalMessage.senderId ||
                currentChat?.member2.id === arrivalMessage.senderId) &&
            refetch();
    }, [arrivalMessage, currentChat, refetch]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    ) => {
        event?.preventDefault();
        if (me?.id && currentChat?.id && newMessage) {
            const receiverId =
                currentChat.member1.id === me.id
                    ? currentChat.member2.id
                    : currentChat.member1.id;

            socket.current?.emit('sendMessage', {
                senderId: me.id,
                receiverId: receiverId,
                text: newMessage,
            });

            await sendMessageMutation({
                variables: {
                    insertMessageInput: {
                        conversationId: currentChat.id,
                        senderId: me.id,
                        text: newMessage,
                    },
                },
                onCompleted() {
                    refetch();
                    setNewMessage('');
                },
            });
        }
    };

    return (
        <Auth>
            <div className="container header-height items-stretch bg-white">
                {/* messenger */}
                <div className="grid h-full grid-cols-12">
                    {/* chat menu */}
                    <div className="col-span-5">
                        <div className="flex h-full flex-col justify-between">
                            {/* header */}
                            <div className="flex justify-between">
                                <p className="font-bold">Chat</p>
                                <ul className="flex items-center space-x-4">
                                    <li className="cursor-pointer rounded-full bg-primary-200 px-2 py-2 text-primary-500">
                                        Tất cả
                                    </li>
                                    <li className="cursor-pointer rounded-full bg-gray-200 px-2 py-2 hover:bg-primary-200 hover:text-primary-500">
                                        Tôi mua
                                    </li>
                                    <li className="cursor-pointer rounded-full bg-gray-200 px-2 py-2 hover:bg-primary-200 hover:text-primary-500">
                                        Tôi bán
                                    </li>
                                    <li>
                                        <BsFillGearFill className="h-6 w-6" />
                                    </li>
                                </ul>
                            </div>
                            {/* search */}
                            <input
                                placeholder="Search for friends"
                                className="w-full border-b-[1px] border-b-slate-500 p-2 outline-none"
                            />
                            {/* list */}
                            <div className="h-full overflow-y-scroll">
                                {conversations &&
                                    conversations.map((conversation) => (
                                        <div
                                            key={conversation.id}
                                            onClick={() =>
                                                setCurrentChat(
                                                    conversation as Conversation,
                                                )
                                            }
                                            role="button"
                                            tabIndex={0}
                                            aria-hidden="true"
                                        >
                                            <Conversations
                                                conversation={
                                                    conversation as Conversation
                                                }
                                            />
                                        </div>
                                    ))}
                            </div>

                            {/* remove */}
                            <div className="mt-[5px] mb-[15px]">
                                <Button
                                    primary
                                    className="w-full items-center justify-center"
                                    LeftIcon={BsTrash}
                                >
                                    Clear conversation
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* chatbox */}
                    <div className="col-span-7 pl-6">
                        {/* wrapper */}
                        <div className="relative flex h-full flex-col justify-between">
                            {currentChat ? (
                                <>
                                    {/* top */}
                                    <div className="h-[520px] overflow-y-scroll">
                                        {messages &&
                                            messages.map((message) => (
                                                <div
                                                    ref={scrollRef}
                                                    key={message.id}
                                                >
                                                    <Message
                                                        own={
                                                            message.sender
                                                                .id === me?.id
                                                        }
                                                        message={
                                                            message as MessageType
                                                        }
                                                    />
                                                </div>
                                            ))}
                                    </div>

                                    {/* bottom */}
                                    <div className="mt-[5px] mb-[15px] flex items-center justify-between">
                                        <ReactTextareaAutosize
                                            minRows={1}
                                            maxRows={6}
                                            placeholder="Write somthing..."
                                            className="h-[90px] w-[80%] border p-[10px] outline-none"
                                            value={newMessage}
                                            onChange={(e) =>
                                                setNewMessage(e.target.value)
                                            }
                                        />
                                        <Button
                                            primary
                                            RightIcon={MdSend}
                                            onClick={handleSendMessage}
                                            isLoading={sendMessageLoading}
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
                    </div>
                </div>
            </div>
        </Auth>
    );
}

export default Chat;

// eslint-disable-next-line react/display-name
Chat.Layout = (page: ReactNode) => (
    <BaseLayout showFooter={false}>{page}</BaseLayout>
);
