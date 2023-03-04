import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { BsFillStarFill, BsFillTelephoneFill } from 'react-icons/bs';
import { FaFacebookF, FaLink, FaTwitter } from 'react-icons/fa';
import { MdReportProblem } from 'react-icons/md';

import { addApolloState, initializeApollo } from '@/libs/apolloClient';
import { ArticlesSwiperInfinite } from '@/components/features/articles';
import { Comment } from '@/components/features/comment';
import {
    Avatar,
    Button,
    ClientOnly,
    Head,
    SwiperNavigation,
    TabView,
} from '@/components/shared';
import {
    Article,
    ArticleDocument,
    ArticleQuery,
    ArticlesDocument,
    ArticlesQuery,
    useArticleQuery,
    useArticlesQuery,
} from '@/types/generated/graphql';

export interface ArticleDetailPageProps {
    article: Article;
}

const limit = 10;

const ArticleDetailPage = () => {
    const router = useRouter();

    const { data, loading, error } = useArticleQuery({
        variables: {
            findArticleInput: { id: router.query.articleId as string },
        },
    });

    const article = data?.article;

    console.log(article);

    return (
        <>
            <Head title={article?.title} description={article?.description} />
            <ClientOnly>
                <div className="mt-[200px] wrapper space-y-20">
                    <div className="grid grid-cols-10 space-y-10 md:space-y-0 md:space-x-10">
                        <div className="col-span-10 md:col-span-4">
                            {/* <SwiperNavigation
                                images={article?.images}
                                className="w-full h-[500px] shadow-3xl"
                            /> */}
                        </div>

                        <div className="col-span-10 md:col-span-6 space-y-10">
                            <p className="text-4xl line-clamp-2 break-words">
                                {article?.title}
                            </p>

                            <div className="flex justify-between">
                                <p className="text-2xl text-primary-400 ">
                                    {article?.price
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

                    <div className="flex justify-between items-center border-gray-400 border px-[20px] py-[20px] rounded-xl">
                        <div className="flex justify-between items-center space-x-4">
                            <Avatar
                                src={
                                    article?.user.avatar ||
                                    '/images/fallback-avatar.png'
                                }
                            />
                            <p>{article?.user.username}</p>
                        </div>
                    </div>

                    <TabView
                        tabs={[
                            {
                                label: 'Description',
                                content: article?.description,
                            },
                            { label: 'Comments', content: <Comment /> },
                            {
                                label: 'MinhQuan articles',
                                content: <div>Article</div>,
                            },
                        ]}
                    />

                    <div className="mb-[50px] space-y-6">
                        <h3 className="text-4xl font-bold">Related articles</h3>
                        <ArticlesSwiperInfinite articleList={[]} />
                    </div>
                </div>
            </ClientOnly>
        </>
    );
};

export const getStaticPaths = async ({ locales }: { locales: string[] }) => {
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.query<ArticlesQuery>({
        query: ArticlesDocument,
        variables: { limit },
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
