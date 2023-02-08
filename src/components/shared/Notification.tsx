import { useState } from 'react';
import { BsBellFill, BsEyeFill } from 'react-icons/bs';
import Avatar from './Avatar';

const Notification = () => {
    const [toggle, setToggle] = useState<boolean>(false);
    return (
        <button
            id="dropdownNotificationButton"
            data-dropdown-toggle="dropdownNotification"
            className="inline-flex items-center text-sm font-medium text-black relative transition-colors"
            type="button"
            onClick={() => setToggle(!toggle)}
        >
            <BsBellFill className="h-4 w-4 hover:text-gray-500 transition-colors" />
            <div className="relative flex">
                <div className="relative inline-flex w-3 h-3 bg-red-500 border-2 rounded-full -top-2 right-3 border-white"></div>
            </div>

            {/* dropdown */}
            <div
                id="dropdownNotification"
                className={`z-20 ${
                    toggle ? 'block' : 'hidden'
                } w-[500px] bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700 absolute top-10 right-0`}
                aria-labelledby="dropdownNotificationButton"
            >
                <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                    Notifications
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    <a
                        href="#"
                        className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <Avatar src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" />
                        <div className="w-full pl-3 text-left">
                            <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                                New message from{' '}
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    Jese Leos
                                </span>
                                :{' '}
                                <span>
                                    Hey, what is up? All set for the
                                    presentation?
                                </span>
                            </div>
                            <div className="text-xs text-blue-600 dark:text-blue-500">
                                a few moments ago
                            </div>
                        </div>
                    </a>
                </div>
                <a
                    href="#"
                    className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
                >
                    <div className="inline-flex items-center ">
                        <BsEyeFill />
                        View all
                    </div>
                </a>
            </div>
        </button>
    );
};

export default Notification;
