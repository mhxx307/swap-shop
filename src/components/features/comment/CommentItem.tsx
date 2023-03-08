import TimeAgo from 'timeago-react';

import { Avatar, Button } from '@/components/shared';
import ReactTextareaAutosize from 'react-textarea-autosize';

interface CommentItemProps {
    comment: any;
    updateMode: any;
    setUpdateMode: any;
    handleUpdateComment: any;
    updateLoading: any;
    deleteLoading: any;
    handleDeleteComment: any;
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
            <Avatar
                src={comment.user.avatar || '/images/avatar-fallback.png'}
            />
            <div className="grid grid-cols-10 mb-4 flex-grow">
                {updateMode && updateMode.id === comment.id ? (
                    <div className="flex flex-col space-x-2 col-span-10 ">
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
                        <div className="flex items-center justify-end mt-2 space-x-2">
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
                            <div className="col-span-8 flex-center justify-self-end space-x-2 ">
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
