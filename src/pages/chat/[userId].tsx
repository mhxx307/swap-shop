import {
    useGetConversationQuery,
    useMeQuery,
    useMessagesQuery,
    useNewMessageMutation,
} from '@/generated/graphql';
import { useRouter } from 'next/router';
import { io, Socket } from 'socket.io-client';

import { MdSend } from 'react-icons/md';
import ReactTextareaAutosize from 'react-textarea-autosize';

import { Message } from '@/components/features/chat';
import { Button } from '@/components/shared';
import { Message as MessageType } from '@/generated/graphql';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { ChatLayout } from '@/components/layouts';
interface UserSocket {
    userId: string;
    socketId: string;
}

function ChatBox() {
    const {
        query: { userId },
    } = useRouter();
    const socket = useRef<Socket>();
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const [onlineUsers, setOnlineUsers] = useState<UserSocket[]>([]);
    console.log(onlineUsers);

    const { data: meData } = useMeQuery();

    const { data: conversationData } = useGetConversationQuery({
        variables: {
            userId: userId as string,
        },
        skip: !userId,
    });

    const { data: messagesData, refetch } = useMessagesQuery({
        variables: {
            conversationId: conversationData?.getConversation?.id as string,
        },
        skip: !conversationData?.getConversation?.id,
    });

    const [sendMessageMutation, { loading: sendMessageLoading }] =
        useNewMessageMutation();

    const conversation = conversationData?.getConversation;
    const messages = messagesData?.messages;
    const me = meData?.me;

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // connect to socket
    useEffect(() => {
        socket.current = io(`ws://localhost:8900`);
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
    }, [me]);

    const handleSendMessage = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    ) => {
        event?.preventDefault();
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
                    },
                },
                onCompleted() {
                    refetch();
                    setNewMessage('');
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
                        <div className="h-[520px] overflow-y-scroll">
                            {messages &&
                                messages.map((message) => (
                                    <div ref={scrollRef} key={message.id}>
                                        <Message
                                            own={message.sender.id === me?.id}
                                            message={message as MessageType}
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
                                onChange={(e) => setNewMessage(e.target.value)}
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
        </>
    );
}

export default ChatBox;

// eslint-disable-next-line react/display-name
ChatBox.Layout = (page: ReactNode) => <ChatLayout>{page}</ChatLayout>;
