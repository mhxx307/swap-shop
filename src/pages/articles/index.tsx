import { ArticleList } from '@/components/features/articles';
import { Button, ClientOnly, Head } from '@/components/shared';
import { GetServerSideProps } from 'next';
import { ArticlesDocument, useArticlesQuery } from '@/types/generated/graphql';
import { addApolloState, initializeApollo } from '@/libs/apolloClient';
import { useContext } from 'react';
import { ArticlesContext } from '@/contexts/ArticlesContext';

export const first = 3;

const Articles = () => {
    const { data, fetchMore } = useArticlesQuery({
        variables: { first },
        notifyOnNetworkStatusChange: true,
    });
    const { hasMore, setHasMore } = useContext(ArticlesContext);
    console.log(hasMore);

    const loadMoreArticles = () => {
        if (data?.articles?.articles) {
            fetchMore({
                variables: {
                    after: data.articles.endCursor,
                },
                updateQuery: (prevResult, { fetchMoreResult }): any => {
                    if (!fetchMoreResult) return prevResult;

                    const mergedArticles = [
                        ...prevResult.articles!.articles,
                        ...fetchMoreResult.articles!.articles.filter(
                            (edge) =>
                                !prevResult.articles!.articles.some(
                                    (prevEdge) => prevEdge.id === edge.id,
                                ),
                        ),
                    ];

                    const totalCount = fetchMoreResult.articles!.totalCount;
                    const endCursor = fetchMoreResult.articles!.endCursor;
                    const hasMore =
                        mergedArticles.length < totalCount
                            ? fetchMoreResult.articles!.hasMore
                            : false;

                    setHasMore(hasMore);

                    return {
                        articles: {
                            ...prevResult.articles,
                            articles: mergedArticles,
                            totalCount: totalCount,
                            endCursor: endCursor,
                            hasMore: hasMore, // Merge hasMore field
                        },
                    };
                },
            });
        }
    };

    return (
        <>
            <Head />
            <ClientOnly>
                <div className="mt-[200px] wrapper space-y-20 pb-[20px]">
                    {data && <ArticleList articles={data.articles?.articles} />}

                    {hasMore && (
                        <Button primary onClick={loadMoreArticles}>
                            Show more
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
            first,
        },
    });

    return addApolloState(apolloClient, {
        props: {},
    });
};
