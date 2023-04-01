import { Conversations } from '@/components/features/chat';
import { Auth } from '@/components/shared';
import React from 'react';
import { BsFillGearFill } from 'react-icons/bs';

function Chat() {
    return (
        <Auth>
            <div className="container header-height items-stretch bg-white">
                <div className="grid grid-cols-12">
                    <div className="col-span-5">
                        {/* header */}
                        <div className="flex justify-between">
                            <p className="font-bold">Chat</p>
                            <ul className="flex items-center space-x-4">
                                <li className="cursor-pointer rounded-full bg-primary-200 px-2 py-2 text-primary-500">
                                    Tất cả
                                </li>
                                <li className="cursor-pointer rounded-full bg-gray-200 px-2 py-2 hover:bg-primary-200 hover:text-primary-500">
                                    Tôi mua
                                </li>
                                <li className="cursor-pointer rounded-full bg-gray-200 px-2 py-2 hover:bg-primary-200 hover:text-primary-500">
                                    Tôi bán
                                </li>
                                <li>
                                    <BsFillGearFill className="h-6 w-6" />
                                </li>
                            </ul>
                        </div>
                        {/* search */}
                        <input
                            placeholder="Search for friends"
                            className="chatMenuInput"
                        />
                        {/* list */}
                        <div className="chatMenuWrapper">
                            <Conversations />
                        </div>
                    </div>
                    <div className="col-span-7">
                        <div>Chatbox</div>
                    </div>
                </div>
            </div>
        </Auth>
    );
}

export default Chat;
