import React from 'react';

function NotificationItem() {
    return (
        <div className="flex items-center">
            <img
                className="mr-4 h-[40px] w-[40px] rounded-full object-cover"
                src={'/images/avatar-fallback.png'}
                alt="awdwd"
            />
            <div>
                <p className="max-w-[100%] text-black line-clamp-2">
                    Bạn đã nhận được tin nhắn từ wdwddw dwdwdw dwdwdwd wdwwdwdw
                    dwdwdw
                </p>
                <p className="text-black">8 ngày trước</p>
            </div>
        </div>
    );
}

export default NotificationItem;
