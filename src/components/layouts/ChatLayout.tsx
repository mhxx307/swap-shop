import HeadlessTippy from '@tippyjs/react/headless'; // different import path!
import { ChangeEvent, useEffect, useRef, useState, useMemo } from 'react';
import { BsFillGearFill } from 'react-icons/bs';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { Conversation, SearchResultList } from '@/components/features/chat';
import { Header } from '@/components/partials';
import { Auth, Button, CommonSection, Spinner } from '@/components/shared';
import {
    Conversation as ConversationType,
    GetUsersByNameDocument,
    GetUsersByNameQuery,
    QueryGetUsersByNameArgs,
    User,
    useGetConversationsQuery,
    useRemoveFromConversationMutation,
} from '@/generated/graphql';
import { useDebounce } from '@/hooks';
import { initializeApollo } from '@/libs/apolloClient';
import classNames from 'classnames';
import keyBy from 'lodash/keyBy';
import produce from 'immer';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { path } from '@/constants';

type UserType = Pick<User, 'id' | 'username' | 'avatar' | '__typename'>;

interface ExtendedConversationType extends ConversationType {
    checked: boolean;
}

function ChatLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState<UserType[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [currentChat, setCurrentChat] = useState<ConversationType | null>(
        null,
    );
    const [searchLoading, setSearchLoading] = useState(false);
    const [showRemoveCheckBox, setShowRemoveCheckBox] = useState(false);
    const [extendedConversations, setExtendedConversations] = useState<
        ExtendedConversationType[]
    >([]);

    const { data: conversationsData, refetch } = useGetConversationsQuery();
    const [removeConversationMutate] = useRemoveFromConversationMutation();

    const debounceValue = useDebounce(searchValue, 500);
    const apolloClient = initializeApollo();

    const conversations = conversationsData?.getConversations;
    const isAllChecked = useMemo(
        () => extendedConversations.every((c) => c.checked),
        [extendedConversations],
    );
    const checkedConversations = useMemo(
        () => extendedConversations.filter((c) => c.checked),
        [extendedConversations],
    );
    const checkedConversationsCount = checkedConversations.length;

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

    useEffect(() => {
        setExtendedConversations((prev) => {
            const extendedConversationObject = keyBy(prev, 'id');
            return (
                conversations?.map((conversation) => {
                    return {
                        ...(conversation as ExtendedConversationType),
                        checked: Boolean(
                            extendedConversationObject[conversation.id]
                                ?.checked,
                        ),
                    };
                }) || []
            );
        });
    }, [conversations]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleCheck =
        (conversationIndex: number) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setExtendedConversations(
                produce((draft) => {
                    draft[conversationIndex].checked = e.target.checked;
                }),
            );
        };

    const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExtendedConversations(
            produce((draft) => {
                draft.forEach((conversation) => {
                    conversation.checked = e.target.checked;
                });
            }),
        );
    };

    const handleRemoveConversation = async () => {
        const conversationIds = checkedConversations.map(
            (conversation) => conversation.id,
        );

        await removeConversationMutate({
            variables: {
                conversationIds: conversationIds,
            },
            onCompleted: () => {
                refetch();
                toast.success('Deleted conversation successfully');
                router.push(path.chat);
            },
        });
    };

    return (
        <Auth>
            <main>
                <Header />
                <div className="app">
                    <div className="flex w-full flex-col">
                        <CommonSection title="Chat" />
                        <div className="container">
                            <div className=" mt-12 bg-white shadow-lg dark:bg-[#343444]">
                                {/* messenger */}
                                <div className="grid grid-cols-12">
                                    {/* chat menu */}
                                    <div className="col-span-5">
                                        <div className="flex h-full flex-col justify-between p-2">
                                            {/* header */}
                                            <div className="mb-4 flex items-center justify-between rounded-sm border-b-[1px] bg-[#F5F1F1] p-3 dark:bg-[#343444]">
                                                <div>
                                                    <p className="font-bold">
                                                        Chat
                                                    </p>
                                                    {showRemoveCheckBox && (
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                isAllChecked
                                                            }
                                                            onChange={
                                                                handleCheckAll
                                                            }
                                                        />
                                                    )}
                                                </div>
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
                                                <div className="flex bg-[#F7F7F7] dark:bg-[#44444c]">
                                                    <div className="relative w-full">
                                                        <input
                                                            ref={inputRef}
                                                            placeholder="Search..."
                                                            className="w-full rounded-sm border border-slate-300 bg-white p-1 outline-none hover:border-indigo-300"
                                                            value={searchValue}
                                                            spellCheck={false}
                                                            onChange={
                                                                handleSearch
                                                            }
                                                            onFocus={() =>
                                                                setShowResult(
                                                                    true,
                                                                )
                                                            }
                                                        />
                                                        <RxMagnifyingGlass className="absolute top-1 right-2 h-6 w-6 " />
                                                    </div>
                                                    {searchLoading && (
                                                        <Spinner />
                                                    )}
                                                </div>
                                            </HeadlessTippy>
                                            {/* list */}
                                            <div className="mt-4 h-full overflow-y-auto">
                                                {extendedConversations.length >
                                                    0 &&
                                                    extendedConversations.map(
                                                        (
                                                            conversation,
                                                            index,
                                                        ) => (
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
                                                                        'bg-gray-200 dark:bg-slate-600':
                                                                            currentChat?.id ===
                                                                            conversation.id,
                                                                    },
                                                                )}
                                                            >
                                                                <div className="flex">
                                                                    {showRemoveCheckBox && (
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={
                                                                                conversation.checked
                                                                            }
                                                                            onChange={handleCheck(
                                                                                index,
                                                                            )}
                                                                        />
                                                                    )}
                                                                    <Conversation
                                                                        conversation={
                                                                            conversation as ConversationType
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        ),
                                                    )}
                                            </div>
                                            <div className="mt-4 flex items-center">
                                                {showRemoveCheckBox ? (
                                                    <>
                                                        {checkedConversationsCount >
                                                            0 && (
                                                            <Button
                                                                className="dark-text-black mr-1 w-full items-center justify-center bg-red-500 text-white "
                                                                onClick={() =>
                                                                    handleRemoveConversation()
                                                                }
                                                            >
                                                                Xóa
                                                            </Button>
                                                        )}
                                                        <Button
                                                            className="dark-text-black 	ml-4 mr-6 w-full items-center justify-center bg-white  text-black"
                                                            onClick={() =>
                                                                setShowRemoveCheckBox(
                                                                    false,
                                                                )
                                                            }
                                                        >
                                                            Hủy
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <Button
                                                        className="w-full items-center justify-center bg-red-500 text-white"
                                                        onClick={() =>
                                                            setShowRemoveCheckBox(
                                                                true,
                                                            )
                                                        }
                                                    >
                                                        Clear conversation
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {/* chatbox */}
                                    <div className="col-span-7">{children}</div>
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
            <li className="cursor-pointer rounded-full bg-secondary px-4 py-1 text-white">
                Tất cả
            </li>
            <li className="cursor-pointer rounded-full bg-gray-200 px-4 py-1 text-black hover:bg-secondary hover:text-white">
                Tôi mua
            </li>
            <li className="cursor-pointer rounded-full bg-gray-200 px-4 py-1 text-black hover:bg-secondary hover:text-white">
                Tôi bán
            </li>
            <li>
                <BsFillGearFill className="h-6 w-6" />
            </li>
        </ul>
    );
};
