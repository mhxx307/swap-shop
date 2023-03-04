import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import TimeAgo from 'timeago-react';
import { NetworkStatus } from '@apollo/client';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { Avatar, Button } from '@/components/shared';
import { limitCommentsPaginated } from '@/constants';
import { addApolloState, initializeApollo } from '@/libs/apolloClient';
import {
    CommentListByArticleIdDocument,
    CommentListByArticleIdQuery,
    PaginatedComments,
    QueryCommentListByArticleIdArgs,
    useCommentListByArticleIdQuery,
    useDeleteCommentMutation,
    useInsertCommentMutation,
    useMeQuery,
} from '@/types/generated/graphql';

function Comment() {
    // TODO: remember fetch more comment
    const { data } = useMeQuery();
    const { query } = useRouter();
    const articleId = query.articleId as string;
    const me = data?.me;

    const {
        data: commentList,
        fetchMore,
        networkStatus,
    } = useCommentListByArticleIdQuery({
        variables: {
            articleId,
            limit: limitCommentsPaginated,
        },
        notifyOnNetworkStatusChange: true,
    });
    const [insertCommentMutation, { loading: insertLoading }] =
        useInsertCommentMutation();
    const [deleteCommentMutation, { loading: deleteLoading }] =
        useDeleteCommentMutation();

    const { register, handleSubmit, setValue } = useForm<{ text: string }>();
    const loadingMoreComment = networkStatus === NetworkStatus.fetchMore;

    const handleMoreComment = () => {
        fetchMore({
            variables: {
                cursor: commentList?.commentListByArticleId?.cursor as string,
                articleId,
            },
            updateQuery: (
                prev: any,
                { fetchMoreResult }: { fetchMoreResult: any },
            ) => {
                if (!fetchMoreResult) return prev;
                return {
                    commentListByArticleId: {
                        ...prev.commentListByArticleId,
                        paginatedComments: [
                            ...prev.commentListByArticleId.paginatedComments,
                            ...fetchMoreResult.commentListByArticleId
                                .paginatedComments,
                        ],
                        cursor: fetchMoreResult.commentListByArticleId.cursor,
                        hasMore: fetchMoreResult.commentListByArticleId.hasMore,
                    },
                };
            },
        });
    };

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
                                const newCommentRef = cache.identify(
                                    data.insertComment.comment,
                                );

                                let newTotalCount =
                                    existingComments.totalCount + 1;

                                const newPaginatedComments = [
                                    { __ref: newCommentRef },
                                    ...existingComments.paginatedComments,
                                ];

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

    const handleDeleteComment = async (id: string) => {
        await deleteCommentMutation({
            variables: {
                deleteCommentId: id,
            },
            update(cache, { data }) {
                if (data?.deleteComment.success) {
                    cache.modify({
                        fields: {
                            commentListByArticleId(existing: any) {
                                const newCommentsAfterDeletion = {
                                    ...existing,
                                    totalCount: existing.totalCount - 1,
                                    paginatedComments:
                                        existing.paginatedComments.filter(
                                            (commentRefObject: any) =>
                                                commentRefObject.__ref !==
                                                `Comment:${id}`,
                                        ),
                                };

                                return newCommentsAfterDeletion;
                            },
                        },
                    });
                }
            },
        });
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
                        isLoading={insertLoading}
                        type="submit"
                        className="flex-center"
                    >
                        Comment
                    </Button>{' '}
                </form>
            </div>

            <div className="-my-5 rounded-b-md py-8 px-10">
                <hr className="py-2" />
                {commentList &&
                    commentList?.commentListByArticleId?.paginatedComments.map(
                        (comment) => (
                            <div
                                key={comment.id}
                                className="relative flex items-center space-x-2 space-y-5"
                            >
                                <hr className="absolute top-10 left-7 z-0 h-16 border" />
                                <div className="z-50">
                                    <Avatar
                                        src={
                                            comment.user.avatar ||
                                            '/images/avatar-fallback.png'
                                        }
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <p className="py-2 text-xs text-gray-400">
                                        <span className="font-semibold text-gray-600">
                                            {comment.user.username}
                                        </span>{' '}
                                        <TimeAgo
                                            datetime={comment.createdDate}
                                        />
                                    </p>
                                    <p className="">{comment.text}</p>
                                </div>
                                {me?.id === comment.user.id && (
                                    <Button
                                        onClick={() =>
                                            handleDeleteComment(comment.id)
                                        }
                                    >
                                        Delete
                                    </Button>
                                )}
                            </div>
                        ),
                    )}
                {commentList?.commentListByArticleId?.hasMore && (
                    <Button
                        onClick={handleMoreComment}
                        isLoading={loadingMoreComment}
                    >
                        {loadingMoreComment ? 'Loading' : 'Show more'}
                    </Button>
                )}
            </div>
        </div>
    );
}

export default Comment;

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    const Cookie = context.req.headers.cookie;
    const apolloClient = initializeApollo();

    await apolloClient.query<
        CommentListByArticleIdQuery,
        QueryCommentListByArticleIdArgs
    >({
        context: { headers: { Cookie } },
        query: CommentListByArticleIdDocument,
        variables: {
            limit: limitCommentsPaginated,
            articleId: context.params?.articleId as string,
        },

        //Rerender component when networkStatus change
        notifyOnNetworkStatusChange: true,
    });
    return addApolloState(apolloClient, {
        props: {},
    });
};
