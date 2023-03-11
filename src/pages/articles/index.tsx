import { useEffect } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { NetworkStatus, useApolloClient } from '@apollo/client';

import { ArticleList } from '@/components/features/articles';
import { Button, ClientOnly, Head } from '@/components/shared';
import {
    Article,
    ArticlesDocument,
    ArticlesQuery,
    PaginatedArticles,
    QueryArticlesArgs,
    useArticlesQuery,
} from '@/generated/graphql';
import { addApolloState, initializeApollo } from '@/libs/apolloClient';
import { limitArticlesPaginated } from '@/constants';

const Articles = () => {
    const {
        data: articlesData,
        fetchMore,
        networkStatus,
    } = useArticlesQuery({
        variables: { limit: limitArticlesPaginated },
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

    const handleMoreArticles = () =>
        fetchMore({
            variables: {
                cursor: (articles as PaginatedArticles).cursor as string,
            },
        });

    if (!articles?.paginatedArticles) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Head />
            <ClientOnly>
                <div className="container header-height space-y-20 pb-[20px]">
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
