import { ArticleList } from '@/components/features/articles';
import { SwiperCategories } from '@/components/features/categories';
import { HeroSection } from '@/components/features/home';
import { ClientOnly, Head, Pagination } from '@/components/shared';
import { ORDER, SORT_BY, STATUS_ARTICLE, path } from '@/constants';
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
import omitBy from 'lodash/omitBy';
import isUndefined from 'lodash/isUndefined';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const Home = () => {
    const queryConfig = useQueryConfig();
    const { data: categoriesData } = useCategoriesQuery();
    const { data: articlesData } = useArticlesQuery({
        variables: {
            queryConfig: {
                ...queryConfig,
                status: STATUS_ARTICLE.APPROVED,
                limit: '8',
            },
        },
    });
    const { data: articlesFavoritesData } = useArticlesQuery({
        variables: {
            queryConfig: {
                page: '1',
                limit: '8',
                sort_by: SORT_BY.favorites,
                order_by: ORDER.desc,
                status: STATUS_ARTICLE.APPROVED,
            },
        },
    });
    const { data: articlesTrendingData } = useArticlesQuery({
        variables: {
            queryConfig: {
                page: '1',
                limit: '8',
                sort_by: SORT_BY.views,
                order_by: ORDER.desc,
                status: STATUS_ARTICLE.APPROVED,
            },
        },
    });

    const categories = categoriesData?.categories;
    const articles = articlesData?.articles.data?.articles;
    const articlesFavorites = articlesFavoritesData?.articles.data?.articles;
    const articlesTrending = articlesTrendingData?.articles.data?.articles;
    const { t } = useTranslation('home');

    return (
        <ClientOnly>
            <Head />
            <div className="container header-height">
                <HeroSection />

                {/* categories */}
                <div>
                    <h3 className="mb-6 text-xl font-bold">
                        {t('explore_categories')}
                    </h3>

                    {categories && (
                        <SwiperCategories
                            categories={categories as Category[]}
                        />
                    )}
                </div>

                {/* articles */}
                <div className="my-6">
                    <ArticleList
                        articles={articles as Article[]}
                        title={t('latest_article') || 'Tin đăng mới nhất'}
                    />
                    <div className="flex-center">
                        <Link href={path.market}>Xem thêm</Link>
                    </div>
                </div>

                <div className="my-6">
                    <ArticleList
                        articles={articlesTrending as Article[]}
                        title={t('trending_article') || 'Tin đăng nổi bật'}
                    />
                    <div className="flex-center">
                        <Link
                            href={`${path.market}?page=1&limit=20&sort_by=views`}
                        >
                            Xem thêm
                        </Link>
                    </div>
                </div>

                <div className="my-6">
                    <ArticleList
                        articles={articlesFavorites as Article[]}
                        title={t('favorite_article') || 'Tin đăng yêu thích'}
                    />
                    <div className="flex-center">
                        <Link
                            href={`${path.market}?page=1&limit=20&sort_by=favoritesCount`}
                        >
                            Xem thêm
                        </Link>
                    </div>
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
