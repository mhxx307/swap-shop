import { Avatar } from '@/components/shared';
import { path } from '@/constants';
import {
    Conversation,
    GetConversationDocument,
    GetConversationQuery,
    QueryGetConversationArgs,
    User,
    useGetConversationsQuery,
    useNewConversationMutation,
} from '@/generated/graphql';
import { initializeApollo } from '@/libs/apolloClient';
import { useRouter } from 'next/router';

type UserType = Pick<User, 'id' | 'username' | 'avatar' | '__typename'>;

interface SearchResultListProps {
    searchResult: UserType[];
    setCurrentChat: (conversation: Conversation) => void;
}

function SearchResultList({
    searchResult,
    setCurrentChat,
}: SearchResultListProps) {
    const [newConversationMutation] = useNewConversationMutation();
    const { refetch } = useGetConversationsQuery();
    const apolloClient = initializeApollo();
    const router = useRouter();

    const handleNewConversation =
        (item: UserType) =>
        async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            const { data: conversationData } = await apolloClient.query<
                GetConversationQuery,
                QueryGetConversationArgs
            >({
                query: GetConversationDocument,
                variables: {
                    userId: item.id,
                },
            });

            // If the conversation already exists, set it as current chat
            if (conversationData.getConversation) {
                setCurrentChat(
                    conversationData.getConversation as Conversation,
                );
                router.push(`${path.chat}/${item.id}`);
                refetch();
                return;
            }

            // If the conversation doesn't exist, create a new one
            await newConversationMutation({
                variables: {
                    userId: item.id,
                },
                onCompleted: (data) => {
                    refetch();
                    setCurrentChat(
                        data.newConversation.conversation as Conversation,
                    );
                    router.push(`${path.chat}/${item.id}`);
                    console.log('tao thanh cong');
                },
            });
        };

    return (
        <div className="flex max-h-[300px] flex-col overflow-y-scroll bg-white">
            {searchResult &&
                searchResult.map((item) => (
                    <button
                        key={item.id}
                        className="mt-4 flex cursor-pointer items-center p-2 transition-colors hover:bg-gray-200"
                        onClick={handleNewConversation(item)}
                    >
                        <Avatar
                            src={
                                item.avatar
                                    ? item.avatar
                                    : '/images/avatar-fallback.png'
                            }
                        />
                        <p className="ml-6 text-sm">{item.username}</p>
                    </button>
                ))}
        </div>
    );
}

export default SearchResultList;
