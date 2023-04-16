import { Avatar } from '@/components/shared';
import { path } from '@/constants';
import { User } from '@/generated/graphql';
import { useRouter } from 'next/router';
import React from 'react';

function UserInfo({ user }: { user: User }) {
    const router = useRouter();
    return (
        <div className=" absolute z-10 inline-block w-64 rounded-lg border border-gray-200 bg-white text-sm font-light text-gray-500  shadow-sm transition-opacity duration-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
            <div className="p-3">
                <div className="mb-2 flex items-center justify-between">
                    <span>
                        <Avatar
                            src={user.avatar || '/images/avatar-fallback.png'}
                        />
                    </span>
                    <div>
                        <button
                            onClick={() =>
                                router.push(`${path.personal}/${user.id}`)
                            }
                            type="button"
                            className="rounded-lg bg-blue-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Trang chủ
                        </button>
                    </div>
                </div>
                <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
                    <span>{user.username}</span>
                </p>
                {user.fullName && (
                    <p className="mb-3 text-sm font-normal">
                        <span className="hover:underline">
                            @{user.fullName}
                        </span>
                    </p>
                )}
                <ul className="flex text-sm font-light">
                    <li className="mr-2">
                        <span className="hover:underline">
                            <span className="font-semibold text-gray-900 dark:text-white">
                                {user.rating
                                    ? user.rating
                                    : 'Do not have a rating'}
                            </span>
                            <span> Rating</span>
                        </span>
                    </li>
                    {/* <li>
                        <span className="hover:underline">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              1000
                            </span>
                            <span> bài viết</span>
                        </span>
                    </li> */}
                </ul>
            </div>

            <div data-popper-arrow></div>
        </div>
    );
}

export default UserInfo;
