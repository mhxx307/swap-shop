import { useEffect } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useApolloClient } from '@apollo/client';
import { isUndefined, omitBy } from 'lodash';

import { ArticleFilter, ArticleList } from '@/components/features/articles';
import { ClientOnly, Head, Pagination } from '@/components/shared';
import {
    Article,
    ArticlesDocument,
    ArticlesQuery,
    QueryArticlesArgs,
    QueryConfig,
    useArticlesQuery,
} from '@/generated/graphql';
import { addApolloState, initializeApollo } from '@/libs/apolloClient';
import { useQueryConfig } from '@/hooks';

const Articles = () => {
    const queryConfig = useQueryConfig();

    const { data: articlesData } = useArticlesQuery({
        variables: {
            queryConfig: queryConfig,
        },
    });

    const articles = articlesData?.articles.data?.articles;

    const client = useApolloClient();

    useEffect(() => {
        return () => {
            // Clear the cache when the user navigates away from the page
            client.resetStore();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!articles) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Head />
            <ClientOnly>
                <div className="container header-height space-y-20 pb-[20px]">
                    <ArticleFilter queryConfig={queryConfig} />

                    <ArticleList articles={articles as Article[]} />

                    <Pagination
                        pageSize={
                            articlesData.articles.data?.pagination
                                .page_size as number
                        }
                        queryConfig={queryConfig}
                    />
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
            page: query.page || '1',
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
        },
        //Rerender component when networkStatus change
        notifyOnNetworkStatusChange: true,
    });

    return addApolloState(apolloClient, {
        props: {},
    });
};
