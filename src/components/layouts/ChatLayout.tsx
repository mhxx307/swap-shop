import HeadlessTippy from '@tippyjs/react/headless'; // different import path!
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { BsFillGearFill, BsTrash } from 'react-icons/bs';

import { Conversation, SearchResultList } from '@/components/features/chat';
import { Auth, Button, CommonSection, Spinner } from '@/components/shared';
import {
    Conversation as ConversationType,
    GetUsersByNameDocument,
    GetUsersByNameQuery,
    QueryGetUsersByNameArgs,
    User,
    useGetConversationsQuery,
} from '@/generated/graphql';
import { useDebounce } from '@/hooks';
import { initializeApollo } from '@/libs/apolloClient';
import classNames from 'classnames';
import { Header } from '@/components/partials';

type UserType = Pick<User, 'id' | 'username' | 'avatar' | '__typename'>;

function ChatLayout({ children }: { children: React.ReactNode }) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState<UserType[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [currentChat, setCurrentChat] = useState<ConversationType | null>(
        null,
    );
    const [searchLoading, setSearchLoading] = useState(false);
    const { data: conversationsData } = useGetConversationsQuery();
    const debounceValue = useDebounce(searchValue, 500);
    const apolloClient = initializeApollo();

    const conversations = conversationsData?.getConversations;

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

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        <Auth>
            <main>
                <Header />
                <div className="app">
                    <div className="flex w-full flex-col">
                        <CommonSection title="Chat" />
                        <div className="container mt-12 bg-white dark:bg-primaryDark">
                            {/* messenger */}
                            <div className="grid grid-cols-12 p-3">
                                {/* chat menu */}
                                <div className="col-span-5">
                                    <div className="flex h-full flex-col justify-between">
                                        {/* header */}
                                        <div className="flex justify-between">
                                            <p className="font-bold">Chat</p>
                                            <ChatOptions />
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
                                                    className="z-50 w-[500px] shadow"
                                                >
                                                    <SearchResultList
                                                        searchResult={
                                                            searchResult
                                                        }
                                                        setCurrentChat={
                                                            setCurrentChat
                                                        }
                                                    />
                                                </div>
                                            )}
                                            placement="bottom-start"
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
                                                            key={
                                                                conversation.id
                                                            }
                                                            onClick={() => {
                                                                setCurrentChat(
                                                                    conversation as ConversationType,
                                                                );
                                                            }}
                                                            role="button"
                                                            tabIndex={0}
                                                            aria-hidden="true"
                                                            className={classNames(
                                                                {
                                                                    'bg-gray-200':
                                                                        currentChat?.id ===
                                                                        conversation.id,
                                                                },
                                                            )}
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
                                                className="w-full items-center justify-center bg-red-500 text-white"
                                                LeftIcon={BsTrash}
                                            >
                                                Clear conversation
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* chatbox */}
                                <div className="col-span-7 pl-6">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Auth>
    );
}

export default ChatLayout;

const ChatOptions = () => {
    return (
        <ul className="flex items-center space-x-4">
            <li className="cursor-pointer rounded-full bg-secondary px-2 py-2 text-white">
                Tất cả
            </li>
            <li className="cursor-pointer rounded-full bg-gray-200 px-2 py-2 hover:bg-secondary hover:text-white">
                Tôi mua
            </li>
            <li className="cursor-pointer rounded-full bg-gray-200 px-2 py-2 hover:bg-secondary hover:text-white">
                Tôi bán
            </li>
            <li>
                <BsFillGearFill className="h-6 w-6" />
            </li>
        </ul>
    );
};
