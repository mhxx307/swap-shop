import { ArticleList } from '@/components/features/articles';
import { Button, ClientOnly, Head } from '@/components/shared';
import { GetServerSideProps } from 'next';
import { ArticlesDocument, useArticlesQuery } from '@/types/generated/graphql';
import { addApolloState, initializeApollo } from '@/libs/apolloClient';
import { NetworkStatus } from '@apollo/client';

export const limit = 3;

const Articles = () => {
    const { data, loading, fetchMore, networkStatus } = useArticlesQuery({
        variables: { limit },
        notifyOnNetworkStatusChange: true,
    });

    const loadingMoreArticles = networkStatus === NetworkStatus.fetchMore;

    const loadMoreArticles = () =>
        fetchMore({ variables: { cursor: data?.articles?.cursor } });

    console.log(data?.articles?.paginatedArticles);

    return (
        <>
            <Head />
            <ClientOnly>
                <div className="mt-[200px] wrapper space-y-20 pb-[20px]">
                    {data?.articles?.paginatedArticles.map((article) => (
                        <div key={article.id}>{article.title}</div>
                    ))}
                    {data?.articles?.hasMore && (
                        <Button
                            isLoading={loadingMoreArticles}
                            onClick={loadMoreArticles}
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
