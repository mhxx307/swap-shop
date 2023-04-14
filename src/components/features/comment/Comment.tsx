import { NetworkStatus } from '@apollo/client';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/shared';
import { limitCommentsPaginated } from '@/constants';
import { addApolloState, initializeApollo } from '@/libs/apolloClient';
import {
    CommentListByArticleIdDocument,
    CommentListByArticleIdQuery,
    InsertCommentInput,
    PaginatedComments,
    QueryCommentListByArticleIdArgs,
    UpdateCommentInput,
    useCommentListByArticleIdQuery,
    useDeleteCommentMutation,
    useInsertCommentMutation,
    useMeQuery,
    useUpdateCommentMutation,
} from '@/generated/graphql';
import { MouseEvent, useState } from 'react';
import CommentItem from './CommentItem';
// import { useAuthContext } from '@/contexts/AuthContext';

interface CommentProps {
    id: string;
}

// ! ApolloError: Cannot read properties of null (reading 'totalCount')
function Comment({ id }: CommentProps) {
    const [updateMode, setUpdateMode] = useState<UpdateCommentInput | null>(
        null,
    );
    const articleId = id;
    // const { profile } = useAuthContext();
    const { data: meData } = useMeQuery();
    const profile = meData?.me;

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
    const [updateCommentMutation, { loading: updateLoading }] =
        useUpdateCommentMutation();
    const { register, handleSubmit, setValue } =
        useForm<Omit<InsertCommentInput, 'articleId'>>();

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

    const handleComment = async ({
        text,
    }: Omit<InsertCommentInput, 'articleId'>) => {
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

                                const newTotalCount =
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

    const handleUpdateComment = async (
        e: MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        e.preventDefault();
        if (updateMode) {
            await updateCommentMutation({
                variables: {
                    updateCommentInput: {
                        id: updateMode.id,
                        text: updateMode.text,
                    },
                },
                update(cache, { data }) {
                    if (
                        data?.updateComment.success &&
                        data.updateComment.comment
                    ) {
                        const updatedComment = data.updateComment.comment;
                        const commentId = cache.identify(updatedComment);

                        cache.modify({
                            id: commentId,
                            fields: {
                                text() {
                                    return updatedComment.text;
                                },
                            },
                        });
                    }
                },
            });
        }
        setUpdateMode(null);
    };

    return (
        <div className="bg-white dark:bg-secondaryDark">
            <div className="-mt-1 space-y-4 rounded-b-sm p-5">
                <p className="text-sm">
                    {profile ? (
                        <>
                            Comment as{' '}
                            <span className="text-red-500">
                                {profile.username}
                            </span>
                        </>
                    ) : (
                        <p>Please sign in to comment!</p>
                    )}
                </p>

                <form
                    action="POST"
                    className="flex flex-col space-y-4"
                    onSubmit={handleSubmit(handleComment)}
                >
                    <textarea
                        {...register('text')}
                        disabled={!profile}
                        className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
                        placeholder={
                            profile
                                ? 'What are your thoughts?'
                                : 'Please sign into comment'
                        }
                    />
                    <Button
                        secondary
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
                {commentList?.commentListByArticleId?.paginatedComments.map(
                    (comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            deleteLoading={deleteLoading}
                            handleDeleteComment={handleDeleteComment}
                            handleUpdateComment={handleUpdateComment}
                            setUpdateMode={setUpdateMode}
                            updateLoading={updateLoading}
                            updateMode={updateMode}
                            me={profile}
                        />
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
