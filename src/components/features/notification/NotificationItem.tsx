import { Logo } from '@/components/shared';
import { Notification, useUserByIdQuery } from '@/generated/graphql';
import DOMPurify from 'dompurify';
import TimeAgo from 'timeago-react';

interface Props {
    notification: Notification;
}

function NotificationItem({ notification }: Props) {
    const { data: userData } = useUserByIdQuery({
        variables: {
            userId: notification.userId as string,
        },
        skip: !notification.userId,
    });

    const user = userData?.getUserById;

    return (
        <div className="flex items-center">
            {user ? (
                <img
                    className="mb-4 h-[40px] w-[40px] rounded-full object-cover"
                    src={
                        user.avatar
                            ? user.avatar
                            : '/images/avatar-fallback.png'
                    }
                    alt=""
                />
            ) : (
                <Logo />
            )}
            <div className="ml-4">
                <div className="max-w-[100%] text-black line-clamp-2 dark:text-white">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(notification.content),
                        }}
                    />
                </div>

                <p className="text-xs font-bold text-gray-400 ">
                    <TimeAgo
                        datetime={notification.createdDate}
                        className="text-[#5142fc]"
                    />
                </p>
            </div>
        </div>
    );
}

export default NotificationItem;
