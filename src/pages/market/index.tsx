import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { isUndefined, omitBy } from 'lodash';

import {
    ArticleList,
    AsideFilterMarket,
    SortArticleList,
} from '@/components/features/articles';
import {
    ClientOnly,
    CommonSection,
    Head,
    Pagination,
} from '@/components/shared';
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

const MarketPage = () => {
    const queryConfig = useQueryConfig();

    const { data: articlesData } = useArticlesQuery({
        variables: {
            queryConfig: queryConfig,
        },
    });

    const articles = articlesData?.articles.data?.articles;

    if (!articles) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Head />
            <ClientOnly>
                <div className="flex w-full flex-col">
                    <CommonSection title="Market" />
                    <div className="container mt-14 space-y-12 pb-[20px]">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-2">
                                <AsideFilterMarket queryConfig={queryConfig} />
                            </div>

                            <div className="col-span-12 lg:col-span-10">
                                <SortArticleList
                                    queryConfig={queryConfig}
                                    pageSize={
                                        articlesData.articles.data?.pagination
                                            .page_size || 0
                                    }
                                />

                                <ArticleList articles={articles as Article[]} />

                                {articles && articles.length > 0 && (
                                    <Pagination
                                        pageSize={
                                            articlesData.articles.data
                                                ?.pagination.page_size as number
                                        }
                                        queryConfig={queryConfig}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </ClientOnly>
        </>
    );
};

export default MarketPage;

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

    const apolloClient = initializeApollo({ headers: context.req.headers });

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
