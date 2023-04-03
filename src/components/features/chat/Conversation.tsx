import { path } from '@/constants';
import {
    Conversation,
    useMeQuery,
    useUserByIdQuery,
} from '@/generated/graphql';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Conversations({ conversation }: { conversation: Conversation }) {
    const router = useRouter();
    const [friendId, setFriendId] = useState('');
    const { data: meData } = useMeQuery();
    const { data: friendData } = useUserByIdQuery({
        variables: {
            userId: friendId,
        },
        skip: !friendId,
    });
    const me = meData?.me;
    const friend = friendData?.getUserById;

    useEffect(() => {
        if (me) {
            const friendId =
                conversation.member1.id === me.id
                    ? conversation.member2.id
                    : conversation.member1.id;

            setFriendId(friendId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <button
            className="flex w-full cursor-pointer items-center p-[10px] hover:bg-gray-200"
            onClick={() => router.push(`${path.chat}/${friendId}`)}
        >
            {friend && (
                <>
                    <img
                        className="mr-[20px] h-[40px] w-[40px] rounded-full object-cover"
                        src={
                            friend?.avatar
                                ? friend.avatar
                                : '/images/avatar-fallback.png'
                        }
                        alt={friend.username}
                    />
                    <span className="font-medium">{friend.username}</span>
                </>
            )}
        </button>
    );
}

export default Conversations;