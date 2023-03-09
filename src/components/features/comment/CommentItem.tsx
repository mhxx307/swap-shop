import TimeAgo from 'timeago-react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { Dispatch, SetStateAction } from 'react';

import { Avatar, Button } from '@/components/shared';
import { UpdateCommentInput } from '@/generated/graphql';

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
            <Avatar src={comment.user.avatar as string} />
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
                            <p className="py-1 text-xs text-gray-400">
                                <span className="font-semibold text-gray-600">
                                    {comment.user.username}
                                </span>{' '}
                                <TimeAgo datetime={comment.createdDate} />
                            </p>
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
