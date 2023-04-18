import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import NotificationItem from './NotificationItem';
import { Notification } from '@/generated/graphql';

interface Props {
    notifications: Notification[] | null | undefined;
}

function NotificationContent({ notifications }: Props) {
    return (
        <div className="w-[45vh] rounded-md bg-white p-2">
            <header className="flex items-center justify-between">
                <p className="text-black">Thông báo</p>
                <AiOutlineSetting
                    fill="black"
                    className="h-5 w-5 cursor-pointer"
                />
            </header>
            <hr className="my-1 bg-gray-400" />
            <div className="h-[400px] overflow-y-auto">
                {notifications ? (
                    notifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">
                        Không có thông báo
                    </p>
                )}
            </div>
        </div>
    );
}

export default NotificationContent;
