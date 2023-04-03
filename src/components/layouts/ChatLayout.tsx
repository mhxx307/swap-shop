import HeadlessTippy from '@tippyjs/react/headless'; // different import path!
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { BsFillGearFill, BsTrash } from 'react-icons/bs';
import { Socket, io } from 'socket.io-client';

import { Conversation, SearchResultList } from '@/components/features/chat';
import { Auth, Button, Spinner } from '@/components/shared';
import {
    Conversation as ConversationType,
    GetUsersByNameDocument,
    GetUsersByNameQuery,
    QueryGetUsersByNameArgs,
    User,
    useGetConversationsQuery,
    useMeQuery,
    useMessagesQuery,
} from '@/generated/graphql';
import { useDebounce } from '@/hooks';
import { initializeApollo } from '@/libs/apolloClient';
import classNames from 'classnames';
import { Header } from '@/components/partials';

interface UserSocket {
    userId: string;
    socketId: string;
}

interface ArrivalMessage {
    senderId: string;
    text: string;
}

type UserType = Pick<User, 'id' | 'username' | 'avatar' | '__typename'>;

function ChatLayout({ children }: { children: React.ReactNode }) {
    const socket = useRef<Socket>();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState<UserType[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [currentChat, setCurrentChat] = useState<ConversationType | null>(
        null,
    );
    const [arrivalMessage, setArrivalMessage] = useState<ArrivalMessage>();
    const [onlineUsers, setOnlineUsers] = useState<UserSocket[]>([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const { data: meData } = useMeQuery();
    const { data: conversationsData } = useGetConversationsQuery();
    const { data: messagesData, refetch } = useMessagesQuery({
        variables: {
            conversationId: currentChat?.id as string,
        },
        skip: !currentChat,
    });
    const debounceValue = useDebounce(searchValue, 500);
    const apolloClient = initializeApollo();

    const me = meData?.me;
    const conversations = conversationsData?.getConversations;
    const messages = messagesData?.messages;

    useEffect(() => {
        if (!debounceValue.trim()) {
            setSearchResult([]);
            return;
        }

        async function fetchSearchResult() {
            setSearchLoading(true);
            const { data: usersData } = await apolloClient.query<
                GetUsersByNameQuery,
                QueryGetUsersByNameArgs
            >({
                query: GetUsersByNameDocument,
                variables: {
                    name: debounceValue,
                },
            });

            if (usersData?.getUsersByName) {
                setSearchLoading(false);
                setSearchResult(usersData.getUsersByName);
            }
        }

        fetchSearchResult();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceValue]);

    // connect to socket
    useEffect(() => {
        socket.current = io('ws://localhost:8900');

        socket.current.on('getMessage', (data: ArrivalMessage) => {
            setArrivalMessage({
                senderId: data.senderId,
                text: data.text,
            });
        });
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

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    console.log(onlineUsers);
    return (
        <Auth>
            <main>
                <Header />
                <div className="app">
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
                                        visible={
                                            showResult &&
                                            searchResult.length > 0
                                        }
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
                                                    setCurrentChat={
                                                        setCurrentChat
                                                    }
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
                                                onFocus={() =>
                                                    setShowResult(true)
                                                }
                                            />
                                            {searchLoading && <Spinner />}
                                        </div>
                                    </HeadlessTippy>

                                    {/* list */}
                                    <div className="h-full overflow-y-scroll">
                                        {conversations &&
                                            conversations.map(
                                                (conversation) => (
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
                                                        className={classNames({
                                                            'bg-gray-200':
                                                                currentChat?.id ===
                                                                conversation.id,
                                                        })}
                                                    >
                                                        <Conversation
                                                            conversation={
                                                                conversation as ConversationType
                                                            }
                                                        />
                                                    </div>
                                                ),
                                            )}
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
                            <div className="col-span-7 pl-6">{children}</div>
                        </div>
                    </div>
                </div>
            </main>
        </Auth>
    );
}

export default ChatLayout;
