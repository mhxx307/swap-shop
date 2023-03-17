import { ArticleList } from '@/components/features/articles';
import { SwiperCategories } from '@/components/features/categories';
import { ClientOnly, Head, Pagination } from '@/components/shared';
import {
    useArticlesQuery,
    useCategoriesQuery,
    Article,
    Category,
    QueryConfig,
    ArticlesQuery,
    QueryArticlesArgs,
    ArticlesDocument,
} from '@/generated/graphql';
import { useQueryConfig } from '@/hooks';
import { addApolloState, initializeApollo } from '@/libs/apolloClient';
import { isUndefined, omitBy } from 'lodash';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

const Home = () => {
    const queryConfig = useQueryConfig();
    const { data: categoriesData } = useCategoriesQuery();
    const { data: articlesData } = useArticlesQuery({
        variables: {
            queryConfig: queryConfig,
        },
    });
    const categories = categoriesData?.categories;
    const articles = articlesData?.articles.data?.articles;

    return (
        <ClientOnly>
            <Head />
            <div className="container header-height">
                {/* categories */}
                <div>
                    <h3 className="text-xl font-bold">Khám phá danh mục</h3>

                    {categories && (
                        <SwiperCategories
                            categories={categories as Category[]}
                        />
                    )}
                </div>

                {/* articles */}
                <div className="mt-6">
                    <ArticleList
                        articles={articles as Article[]}
                        title="Tin đăng mới"
                    />
                    <Pagination
                        pageSize={
                            articlesData?.articles.data?.pagination
                                .page_size as number
                        }
                        queryConfig={queryConfig}
                    />
                </div>
            </div>
        </ClientOnly>
    );
};

export default Home;

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
