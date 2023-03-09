import { GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { BsFillStarFill, BsFillTelephoneFill } from 'react-icons/bs';
import { FaFacebookF, FaLink, FaTwitter } from 'react-icons/fa';
import { MdReportProblem } from 'react-icons/md';

import { addApolloState, initializeApollo } from '@/libs/apolloClient';
import { ArticlesSwiperInfinite } from '@/components/features/articles';
import { Comment } from '@/components/features/comment';
import { Avatar, Button, ClientOnly, Head, TabView } from '@/components/shared';
import {
    Article,
    ArticleDocument,
    ArticleQuery,
    ArticlesDocument,
    ArticlesQuery,
    useArticleQuery,
} from '@/generated/graphql';
import { limitArticlesPaginated } from '@/constants';

export interface ArticleDetailPageProps {
    article: Article;
}

const ArticleDetailPage = () => {
    const router = useRouter();

    const { data, loading } = useArticleQuery({
        variables: {
            findArticleInput: { id: router.query.articleId as string },
        },
    });

    if (!loading && !data?.article) {
        router.push('/404');
    }

    const article = data?.article;

    return (
        <>
            {article ? (
                <>
                    <Head
                        title={article.title}
                        description={article.description}
                    />
                    <ClientOnly>
                        <div className="wrapper header-height space-y-20">
                            <div className="grid grid-cols-10 space-y-10 md:space-y-0 md:space-x-10">
                                <div className="col-span-10 md:col-span-4">
                                    {/* <SwiperNavigation
										images={article?.images}
										className="w-full h-[500px] shadow-3xl"
									/> */}
                                </div>

                                <div className="col-span-10 space-y-10 md:col-span-6">
                                    <p className="break-words text-4xl line-clamp-2">
                                        {article.title}
                                    </p>

                                    <div className="flex justify-between">
                                        <p className="text-2xl text-primary-400 ">
                                            {article.price
                                                ? article.price
                                                : 'Miễn phí'}
                                        </p>
                                        <Button
                                            primary
                                            LeftIcon={MdReportProblem}
                                            iconClassName="w-4 h-4"
                                        >
                                            Tố cáo
                                        </Button>
                                    </div>

                                    <div className="border-bottom" />

                                    {/* <p>Category: {article.category}</p> */}

                                    <Button
                                        className="btn-contact"
                                        primary
                                        LeftIcon={BsFillTelephoneFill}
                                        iconClassName="w-4 h-4"
                                    >
                                        Liên hệ
                                    </Button>

                                    <Button
                                        className="btn-wishlist"
                                        LeftIcon={BsFillStarFill}
                                        iconClassName="w-4 h-4"
                                    >
                                        Add to wishlist
                                    </Button>
                                    <div className="flex items-center space-x-6">
                                        <span>Share:</span>
                                        <FaFacebookF />
                                        <FaTwitter />
                                        <FaLink />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between rounded-xl border border-gray-400 px-[20px] py-[20px]">
                                <div className="flex items-center justify-between space-x-4">
                                    <Avatar
                                        src={article.user.avatar as string}
                                    />
                                    <p>{article.user.username}</p>
                                </div>
                            </div>

                            <TabView
                                tabs={[
                                    {
                                        label: 'Description',
                                        content: article.description,
                                    },
                                    { label: 'Comments', content: <Comment /> },
                                    {
                                        label: 'MinhQuan articles',
                                        content: <div>Article</div>,
                                    },
                                ]}
                            />

                            <div className="mb-[50px] space-y-6">
                                <h3 className="text-4xl font-bold">
                                    Related articles
                                </h3>
                                <ArticlesSwiperInfinite articleList={[]} />
                            </div>
                        </div>
                    </ClientOnly>
                </>
            ) : (
                <div>
                    <p>Loading...</p>
                </div>
            )}
        </>
    );
};

export const getStaticPaths = async ({ locales }: { locales: string[] }) => {
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.query<ArticlesQuery>({
        query: ArticlesDocument,
        variables: { limit: limitArticlesPaginated },
    });

    return {
        paths: data?.articles?.paginatedArticles
            .map((article: Article) => {
                return locales.map((locale) => {
                    return {
                        params: { articleId: article.id.toString() },
                        locale,
                    };
                });
            })
            .flat(),
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async (
    context: GetStaticPropsContext,
) => {
    const apolloClient = initializeApollo();

    await apolloClient.query<ArticleQuery>({
        query: ArticleDocument,
        variables: { findArticleInput: { id: context.params?.articleId } },
    });

    return addApolloState(apolloClient, { props: {} });
};

export default ArticleDetailPage;
