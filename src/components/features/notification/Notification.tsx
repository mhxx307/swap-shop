import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import NotificationItem from './NotificationItem';

function Notification() {
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
            <div>
                <NotificationItem />
            </div>
        </div>
    );
}

export default Notification;
