import TimeAgo from 'timeago-react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { Dispatch, SetStateAction } from 'react';

import { Avatar, Button, Popover } from '@/components/shared';
import { UpdateCommentInput } from '@/generated/graphql';
import { AiOutlineMore } from 'react-icons/ai';
import { RiDeleteBinLine, RiPencilLine } from 'react-icons/ri';
import UserInfo from './UserInfo';

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
                isArrow={false}
                renderPopover={<UserInfo user={comment.user} />}
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
                            className="rounded-sm p-2 text-black outline-none"
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
                        <div className="col-span-9">
                            <div className="py-1 text-xs text-gray-400">
                                <span className="font-semibold text-gray-600">
                                    {comment.user.username}
                                </span>{' '}
                                <TimeAgo datetime={comment.createdDate} />
                            </div>
                            <p className="max-w-[1000px] break-words">
                                {comment.text}
                            </p>
                        </div>
                        {me?.id === comment.user.id && (
                            <div className="flex-center col-span-1 space-x-2 justify-self-end ">
                                <Popover
                                    isArrow={false}
                                    renderPopover={
                                        <div className="bg-white dark:bg-[#6B728E]">
                                            <Button
                                                isLoading={deleteLoading}
                                                className="w-full hover:bg-gray-300"
                                                LeftIcon={RiDeleteBinLine}
                                                onClick={() =>
                                                    handleDeleteComment(
                                                        comment.id,
                                                    )
                                                }
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                isLoading={updateLoading}
                                                className="w-full hover:bg-gray-300"
                                                LeftIcon={RiPencilLine}
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
                                    }
                                >
                                    <AiOutlineMore className="h-6 w-6 cursor-pointer transition-opacity hover:opacity-80" />
                                </Popover>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default CommentItem;
