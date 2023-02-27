import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import TimeAgo from 'timeago-react';

import {
    useCommentListByArticleIdQuery,
    useInsertCommentMutation,
    useMeQuery,
    PaginatedComments,
} from '@/types/generated/graphql';
import { Avatar, Button } from '@/components/shared';
import { limitCommentsPaginated } from '@/constants';

function Comment() {
    // TODO: remember fetch more comment
    const { data } = useMeQuery();
    const { query } = useRouter();
    const articleId = query.articleId as string;

    const { data: commentList, fetchMore } = useCommentListByArticleIdQuery({
        variables: {
            articleId,
            limit: limitCommentsPaginated,
        },
    });

    const [insertCommentMutation, { loading }] = useInsertCommentMutation();

    const { register, handleSubmit, setValue } = useForm<{ text: string }>();

    const me = data?.me;

    console.log(commentList);

    const handleComment = async ({ text }: { text: string }) => {
        await insertCommentMutation({
            variables: {
                insertCommentInput: {
                    articleId,
                    text,
                },
            },
            update(cache, { data }) {
                cache.modify({
                    fields: {
                        commentListByArticleId(
                            existingComments: PaginatedComments,
                        ) {
                            if (
                                data?.insertComment.success &&
                                data.insertComment.comment
                            ) {
                                const newArticleRef = cache.identify(
                                    data.insertComment.comment,
                                );

                                const newTotalCount =
                                    existingComments.totalCount! + 1;

                                const newPaginatedComments = [
                                    { __ref: newArticleRef },
                                    ...existingComments.paginatedComments,
                                ];

                                // Remove final article from paginatedArticles array using splice()
                                if (
                                    newPaginatedComments.length >
                                    limitCommentsPaginated
                                ) {
                                    newPaginatedComments.splice(-1, 1);
                                }

                                const newCommentsAfterCreation = {
                                    ...existingComments,
                                    totalCount: newTotalCount,
                                    paginatedComments: newPaginatedComments,
                                };

                                return newCommentsAfterCreation;
                            }
                        },
                    },
                });
            },
        });

        setValue('text', '');
    };

    return (
        <div className="bg-white dark:bg-secondaryDark">
            <div className="-mt-1 rounded-b-sm p-5 space-y-4">
                <p className="text-sm">
                    Comment as{' '}
                    <span className="text-red-500">{me?.username}</span>
                </p>

                <form
                    action="POST"
                    className="flex flex-col space-y-4"
                    onSubmit={handleSubmit(handleComment)}
                >
                    <textarea
                        {...register('text')}
                        disabled={!me}
                        className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
                        placeholder={
                            me
                                ? 'What are your thoughts?'
                                : 'Please sign into comment'
                        }
                    />
                    <Button
                        primary
                        isLoading={loading}
                        type="submit"
                        className="flex-center"
                    >
                        Comment
                    </Button>{' '}
                </form>
            </div>

            <div className="-my-5 rounded-b-md py-8 px-10">
                <hr className="py-2" />
                {commentList?.commentListByArticleId?.paginatedComments.map(
                    (comment) => (
                        <div
                            key={comment.id}
                            className="relative flex items-center space-x-2 space-y-5"
                        >
                            <hr className="absolute top-10 left-7 z-0 h-16 border" />
                            <div className="z-50">
                                <Avatar src={comment.user.avatar!} />
                            </div>
                            <div className="flex flex-col">
                                <p className="py-2 text-xs text-gray-400">
                                    <span className="font-semibold text-gray-600">
                                        {comment.user.username}
                                    </span>{' '}
                                    <TimeAgo datetime={comment.createdDate} />
                                </p>
                                <p className="">{comment.text}</p>
                            </div>
                        </div>
                    ),
                )}
            </div>
        </div>
    );
}

export default Comment;
