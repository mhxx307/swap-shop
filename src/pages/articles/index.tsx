import { useEffect } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { NetworkStatus, useApolloClient } from '@apollo/client';
import { isUndefined, omitBy } from 'lodash';

import { ArticleFilter, ArticleList } from '@/components/features/articles';
import { Button, ClientOnly, Head } from '@/components/shared';
import {
    Article,
    ArticlesDocument,
    ArticlesQuery,
    PaginatedArticles,
    QueryArticlesArgs,
    QueryConfig,
    useArticlesQuery,
} from '@/generated/graphql';
import { addApolloState, initializeApollo } from '@/libs/apolloClient';
import { useQueryConfig } from '@/hooks';

const Articles = () => {
    const queryConfig = useQueryConfig();

    const {
        data: articlesData,
        fetchMore,
        networkStatus,
        refetch,
    } = useArticlesQuery({
        variables: {
            queryConfig: queryConfig,
            cursor: null, // first fetch, no cursor provided
        },
        notifyOnNetworkStatusChange: true,
    });

    const client = useApolloClient();
    const articles = articlesData?.articles;
    const loadingMoreArticles = networkStatus === NetworkStatus.fetchMore;

    useEffect(() => {
        return () => {
            // Clear the cache when the user navigates away from the page
            client.resetStore();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     refetch();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [queryConfig]);

    const handleMoreArticles = () => {
        fetchMore({
            variables: {
                cursor: (articles as PaginatedArticles).paginatedArticles[
                    (articles as PaginatedArticles).paginatedArticles.length - 1
                ].createdDate,
            },
        });
    };

    if (!articles?.paginatedArticles) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Head />
            <ClientOnly>
                <div className="container header-height space-y-20 pb-[20px]">
                    <ArticleFilter queryConfig={queryConfig} />

                    <ArticleList
                        articles={articles.paginatedArticles as Article[]}
                    />

                    {articles.hasMore && (
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
    const { query } = context;
    const queryConfig: QueryConfig = omitBy(
        {
            limit: query.limit || '20',
            sort_by: query.sort_by,
            order_by: query.order_by,
            title: query.title,
            price_max: query.price_max,
            price_min: query.price_min,
            categories: query.categories,
        },
        isUndefined,
    );

    const Cookie = context.req.headers.cookie;

    const apolloClient = initializeApollo();

    await apolloClient.query<ArticlesQuery, QueryArticlesArgs>({
        context: { headers: { Cookie } },
        query: ArticlesDocument,
        variables: {
            queryConfig: queryConfig,
            cursor: null, // first fetch, no cursor provided
        },

        //Rerender component when networkStatus change
        notifyOnNetworkStatusChange: true,
    });

    return addApolloState(apolloClient, {
        props: {},
    });
};
