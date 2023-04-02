import { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { BsFillGearFill, BsTrash } from 'react-icons/bs';
import { MdSend } from 'react-icons/md';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { io, Socket } from 'socket.io-client';
import HeadlessTippy from '@tippyjs/react/headless'; // different import path!

import {
    Conversation,
    Message,
    SearchResultList,
} from '@/components/features/chat';
import { BaseLayout } from '@/components/layouts';
import { Auth, Button, Spinner } from '@/components/shared';
import {
    Conversation as ConversationType,
    Message as MessageType,
    User,
    useGetConversationsQuery,
    useGetUsersByNameQuery,
    useMeQuery,
    useMessagesQuery,
    useNewMessageMutation,
} from '@/generated/graphql';
import { useDebounce } from '@/hooks';

interface UserSocket {
    userId: string;
    socketId: string;
}

interface ArrivalMessage {
    senderId: string;
    text: string;
}

type UserType = Pick<User, 'id' | 'username' | 'avatar' | '__typename'>;

function Chat() {
    const socket = useRef<Socket | null>();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState<UserType[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [currentChat, setCurrentChat] = useState<ConversationType | null>(
        null,
    );
    const [newMessage, setNewMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState<ArrivalMessage>();
    const [onlineUsers, setOnlineUsers] = useState<UserSocket[]>([]);
    const { data: meData } = useMeQuery();
    const { data: conversationsData } = useGetConversationsQuery();
    const { data: messagesData, refetch } = useMessagesQuery({
        variables: {
            conversationId: currentChat?.id as string,
        },
        skip: !currentChat,
    });
    const debounceValue = useDebounce(searchValue, 500);
    const { data: usersData, loading: findUserLoading } =
        useGetUsersByNameQuery({
            variables: {
                name: debounceValue,
            },
            skip: !debounceValue,
        });
    const [sendMessageMutation, { loading: sendMessageLoading }] =
        useNewMessageMutation();

    const me = meData?.me;
    const conversations = conversationsData?.getConversations;
    const messages = messagesData?.messages;

    useEffect(() => {
        if (!debounceValue.trim()) {
            setSearchResult([]);
            return;
        }

        if (usersData?.getUsersByName) {
            setSearchResult(usersData.getUsersByName);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceValue]);

    // connect to socket
    useEffect(() => {
        socket.current = io('ws://localhost:8900');

        socket.current?.on('getMessage', (data: ArrivalMessage) => {
            setArrivalMessage({
                senderId: data.senderId,
                text: data.text,
            });
        });
    }, []);

    // add user and getUsers to socket
    useEffect(() => {
        socket.current?.emit('addUser', me?.id);
        socket.current?.on('getUsers', (users: UserSocket[]) => {
            setOnlineUsers(users);
        });
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

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
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
                            <HeadlessTippy
                                visible={showResult && searchResult.length > 0}
                                interactive={true}
                                appendTo={() => document.body}
                                render={(attrs) => (
                                    <div
                                        tabIndex={-1}
                                        {...attrs}
                                        className="z-50 w-[400px] shadow"
                                    >
                                        <SearchResultList
                                            searchResult={searchResult}
                                            currentChat={
                                                currentChat as ConversationType
                                            }
                                            setCurrentChat={setCurrentChat}
                                        />
                                    </div>
                                )}
                                placement="bottom-end"
                                onClickOutside={() => {
                                    setShowResult(false);
                                }}
                            >
                                <div className="flex">
                                    <input
                                        ref={inputRef}
                                        placeholder="Search..."
                                        className="w-full border-b-[1px] border-b-slate-500 p-2 outline-none"
                                        value={searchValue}
                                        spellCheck={false}
                                        onChange={handleSearch}
                                        onFocus={() => setShowResult(true)}
                                    />
                                    {findUserLoading && <Spinner />}
                                </div>
                            </HeadlessTippy>

                            {/* list */}
                            <div className="h-full overflow-y-scroll">
                                {conversations &&
                                    conversations.map((conversation) => (
                                        <div
                                            key={conversation.id}
                                            onClick={() => {
                                                setCurrentChat(
                                                    conversation as ConversationType,
                                                );
                                            }}
                                            role="button"
                                            tabIndex={0}
                                            aria-hidden="true"
                                        >
                                            <Conversation
                                                conversation={
                                                    conversation as ConversationType
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
