import { getTextColorByPath } from '@/utils';
import Tippy from '@tippyjs/react';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { BsBellFill } from 'react-icons/bs';
import { Notification as NotificationType } from '@/generated/graphql';
import NotificationContent from './NotificationContent';
import { useNotification } from '@/hooks';

function Notification() {
    const router = useRouter();
    const optionRef = useRef<HTMLSpanElement | null>(null);
    const textColor = getTextColorByPath(router.pathname);
    const { isNew, notificationList, setIsNew } = useNotification();

    return (
        <Tippy
            interactive={true}
            render={(attrs) => (
                <div tabIndex={-1} {...attrs}>
                    <NotificationContent
                        notifications={notificationList as NotificationType[]}
                    />
                </div>
            )}
            trigger="click"
            animation={false}
            offset={[6, 20]}
            placement="bottom-end"
            onClickOutside={() => {
                setIsNew(false);
            }}
        >
            <span ref={optionRef} className="relative cursor-pointer">
                {isNew && (
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                )}
                <BsBellFill
                    className={`h-4 w-4 transition-colors hover:text-gray-500 ${textColor}`}
                />
            </span>
        </Tippy>
    );
}

export default Notification;
