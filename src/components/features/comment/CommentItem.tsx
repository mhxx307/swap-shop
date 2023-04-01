import TimeAgo from 'timeago-react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { Dispatch, SetStateAction } from 'react';

import { Avatar, Button, Popover } from '@/components/shared';
import { UpdateCommentInput, PaginatedComments } from '@/generated/graphql';

// ! comment fix any type
interface CommentItemProps {
    comment: any;
    updateMode: UpdateCommentInput | null;
    setUpdateMode: Dispatch<SetStateAction<UpdateCommentInput | null>>;
    handleUpdateComment: (e: any) => void;
    updateLoading: boolean;
    deleteLoading: boolean;
    handleDeleteComment: (e: any) => void;
    me: any;
}
// nho dung debounce cho update comment
function CommentItem({
    comment,
    updateMode,
    setUpdateMode,
    handleUpdateComment,
    updateLoading,
    deleteLoading,
    handleDeleteComment,
    me,
}: CommentItemProps) {
    return (
        <div className="flex space-x-4">
            <Popover
                renderPopover={
                    <div className=" absolute z-10 inline-block w-64 rounded-lg border border-gray-200 bg-white text-sm font-light text-gray-500  shadow-sm transition-opacity duration-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
                        <div className="p-3">
                            <div className="mb-2 flex items-center justify-between">
                                <span>
                                    <Avatar
                                        src={comment.user.avatar as string}
                                    />
                                </span>
                                <div>
                                    <button
                                        type="button"
                                        className="rounded-lg bg-blue-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Follow
                                    </button>
                                </div>
                            </div>
                            <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
                                <span>{comment.user.username}</span>
                            </p>
                            <p className="mb-3 text-sm font-normal">
                                <span className="hover:underline">@Hoang</span>
                            </p>
                            <p className="mb-4 text-sm font-light">
                                Open-source contributor. Building{' '}
                                <span className="text-blue-600 hover:underline dark:text-blue-500">
                                    flowbite.com
                                </span>
                                .
                            </p>
                            <ul className="flex text-sm font-light">
                                <li className="mr-2">
                                    <span className="hover:underline">
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            799
                                        </span>
                                        <span>Following</span>
                                    </span>
                                </li>
                                <li>
                                    <span className="hover:underline">
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            3,758
                                        </span>
                                        <span>Followers</span>
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div data-popper-arrow></div>
                    </div>
                }
            >
                <Avatar src={comment.user.avatar as string} />
            </Popover>
            <div className="mb-4 grid flex-grow grid-cols-10">
                {updateMode && updateMode.id === comment.id ? (
                    <div className="col-span-10 flex flex-col space-x-2 ">
                        <ReactTextareaAutosize
                            onChange={(e) =>
                                setUpdateMode((prev: any) => ({
                                    ...prev,
                                    text: e.target.value,
                                }))
                            }
                            minRows={1}
                            maxRows={6}
                            defaultValue={comment.text}
                        />
                        <div className="mt-2 flex items-center justify-end space-x-2">
                            <Button onClick={() => setUpdateMode(null)}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleUpdateComment}
                                primary
                                isLoading={updateLoading}
                                disable={updateMode.text.length === 0}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="col-span-2">
                            <div className="py-1 text-xs text-gray-400">
                                <span className="font-semibold text-gray-600">
                                    {comment.user.username}
                                </span>{' '}
                                <TimeAgo datetime={comment.createdDate} />
                            </div>
                            <p>{comment.text}</p>
                        </div>
                        {me?.id === comment.user.id && (
                            <div className="flex-center col-span-8 space-x-2 justify-self-end ">
                                <Button
                                    isLoading={deleteLoading}
                                    primary
                                    onClick={() =>
                                        handleDeleteComment(comment.id)
                                    }
                                >
                                    Delete
                                </Button>
                                <Button
                                    isLoading={updateLoading}
                                    primary
                                    onClick={() =>
                                        setUpdateMode({
                                            id: comment.id,
                                            text: comment.text,
                                        })
                                    }
                                >
                                    Update
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default CommentItem;
