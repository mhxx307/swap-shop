import { ArticleList } from '@/components/features/articles';
import { Button, ClientOnly, Head } from '@/components/shared';
import { GetServerSideProps } from 'next';
import { ArticlesDocument, useArticlesQuery } from '@/types/generated/graphql';
import { addApolloState, initializeApollo } from '@/libs/apolloClient';
import { NetworkStatus } from '@apollo/client';
import { useContext } from 'react';
import { ArticlesContext } from '@/contexts/ArticlesContext';

export const limit = 3;

const Articles = () => {
    const { data, loading, fetchMore, networkStatus } = useArticlesQuery({
        variables: { limit },
        notifyOnNetworkStatusChange: true,
    });

    const { hasMore, setHasMore } = useContext(ArticlesContext);

    const loadingMoreArticles = networkStatus === NetworkStatus.fetchMore;

    const handleFetchMore = () => {
        console.log(data?.articles?.cursor);
        fetchMore({
            variables: { cursor: data?.articles?.cursor as string },
            updateQuery: (prev, { fetchMoreResult }): any => {
                if (!fetchMoreResult) return prev;

                if (fetchMoreResult.articles?.hasMore === false) {
                    setHasMore(fetchMoreResult.articles?.hasMore);
                }

                return {
                    articles: {
                        ...fetchMoreResult.articles,
                        paginatedArticles: [
                            ...prev.articles!.paginatedArticles,
                            ...fetchMoreResult.articles!.paginatedArticles,
                        ],
                    },
                };
            },
        });
    };

    return (
        <>
            <Head />
            <ClientOnly>
                <div className="mt-[200px] wrapper space-y-20 pb-[20px]">
                    {data?.articles?.paginatedArticles.map((article) => (
                        <div key={article.id}>{article.title}</div>
                    ))}

                    {hasMore && (
                        <Button
                            primary
                            isLoading={loadingMoreArticles}
                            onClick={handleFetchMore}
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

export const getServerSideProps: GetServerSideProps = async () => {
    const apolloClient = initializeApollo();

    await apolloClient.query({
        query: ArticlesDocument,
        variables: {
            limit,
        },
    });

    return addApolloState(apolloClient, {
        props: {},
    });
};
