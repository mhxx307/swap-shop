import { path } from '@/constants';
import { useAuthContext } from '@/contexts/AuthContext';
import { Conversation, useUserByIdQuery } from '@/generated/graphql';
import { generateNameId } from '@/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Conversations({ conversation }: { conversation: Conversation }) {
    const router = useRouter();
    const [friendId, setFriendId] = useState('');
    const { profile } = useAuthContext();
    const { data: friendData } = useUserByIdQuery({
        variables: {
            userId: friendId,
        },
        skip: !friendId,
    });
    const friend = friendData?.getUserById;

    useEffect(() => {
        if (profile) {
            const friendId =
                conversation.member1.id === profile.id
                    ? conversation.member2.id
                    : conversation.member1.id;

            setFriendId(friendId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <button
            className="flex w-full cursor-pointer items-center p-[10px] hover:bg-gray-200"
            onClick={() =>
                router.push(
                    `${path.chat}/${generateNameId({
                        id: friendId,
                        name: conversation.article.id,
                    })}`,
                )
            }
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
