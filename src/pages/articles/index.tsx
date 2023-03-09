import { useEffect } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { NetworkStatus, useApolloClient } from '@apollo/client';

import { ArticleList } from '@/components/features/articles';
import { Button, ClientOnly, Head } from '@/components/shared';
import {
    ArticlesDocument,
    ArticlesQuery,
    QueryArticlesArgs,
    useArticlesQuery,
} from '@/generated/graphql';
import { addApolloState, initializeApollo } from '@/libs/apolloClient';
import { limitArticlesPaginated } from '@/constants';

const Articles = () => {
    const { data, fetchMore, networkStatus } = useArticlesQuery({
        variables: { limit: limitArticlesPaginated },
        notifyOnNetworkStatusChange: true,
    });

    const loadingMoreArticles = networkStatus === NetworkStatus.fetchMore;

    const handleMoreArticles = () =>
        fetchMore({ variables: { cursor: data?.articles?.cursor as string } });

    const client = useApolloClient();

    useEffect(() => {
        return () => {
            // Clear the cache when the user navigates away from the page
            client.resetStore();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Head />
            <ClientOnly>
                <div className="wrapper header-height space-y-20 pb-[20px]">
                    <ArticleList articles={data?.articles?.paginatedArticles} />

                    {data?.articles?.hasMore && (
                        <Button
                            primary
                            isLoading={loadingMoreArticles}
                            onClick={handleMoreArticles}
                        >
                            {loadingMoreArticles ? 'Loading' : 'Show more'}
                        </Button>
                    )}
                </div>
            </ClientOnly>
        </>
    );
};

export default Articles;

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    const Cookie = context.req.headers.cookie;

    const apolloClient = initializeApollo();

    await apolloClient.query<ArticlesQuery, QueryArticlesArgs>({
        context: { headers: { Cookie } },
        query: ArticlesDocument,
        variables: { limit: limitArticlesPaginated },

        //Rerender component when networkStatus change
        notifyOnNetworkStatusChange: true,
    });

    return addApolloState(apolloClient, {
        props: {},
    });
};
