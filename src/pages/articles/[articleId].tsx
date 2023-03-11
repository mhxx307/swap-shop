import { GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import {
    BsChevronLeft,
    BsChevronRight,
    BsFillStarFill,
    BsFillTelephoneFill,
} from 'react-icons/bs';
import { FaFacebookF, FaLink, FaTwitter } from 'react-icons/fa';
import { MdReportProblem } from 'react-icons/md';
import { useEffect, useMemo, useRef, useState } from 'react';

import { addApolloState, initializeApollo } from '@/libs/apolloClient';
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
    const imageRef = useRef<HTMLImageElement>(null);

    // lấy 5 ảnh từ 0 1 2 3 4 => cắt qua slice sẽ không lấy số cuối nên phải để 5
    const [currentImagesIndex, setCurrentImagesIndex] = useState([0, 5]);
    const [activeImage, setActiveImage] = useState('');

    const currentImages = useMemo(() => {
        return article ? article.images.slice(...currentImagesIndex) : [];
    }, [article, currentImagesIndex]);

    useEffect(() => {
        if (article) {
            setActiveImage(article.images[0]);
        }
    }, [article]);

    const prev = () => {
        if (currentImagesIndex[0] > 0) {
            setCurrentImagesIndex((prev) => [prev[0] - 1, prev[1] - 1]);
        }
    };

    const next = () => {
        if (currentImagesIndex[1] < (article as Article).images.length) {
            setCurrentImagesIndex((prev) => [prev[0] + 1, prev[1] + 1]);
        }
    };

    const handleChooseImage = (img: string) => {
        setActiveImage(img);
    };

    const handleZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const image = imageRef.current as HTMLImageElement;
        const rect = e.currentTarget.getBoundingClientRect();

        const { naturalHeight, naturalWidth } = image;
        const width = naturalHeight;
        const height = naturalWidth;

        const { offsetX, offsetY } = e.nativeEvent;

        // c2: lấy offsetX, offsetY không cần xử lý bubble event
        // const offsetX = e.pageX - (rect.x + window.scrollX);
        // const offsetY = e.pageY - (rect.y + window.scrollY);

        const top = offsetY * (1 - naturalHeight / rect.height);
        const left = offsetX * (1 - naturalWidth / rect.width);

        image.style.width = `${width}px`;
        image.style.height = `${height}px`;
        image.style.maxWidth = 'unset';
        image.style.top = `${top}px`;
        image.style.left = `${left}px`;
    };

    const handleRemoveZoom = () => {
        const image = imageRef.current as HTMLImageElement;
        image.removeAttribute('style');
    };

    if (!article) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Head title={article.title} description={article.description} />
            <ClientOnly>
                <div className="container header-height">
                    <div className="grid grid-cols-10 gap-6 bg-white p-4 shadow-3xl">
                        {/* images slider */}
                        <div className="col-span-10 md:col-span-4">
                            <div
                                className="relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow"
                                onMouseMove={handleZoom}
                                onMouseLeave={handleRemoveZoom}
                            >
                                <img
                                    src={activeImage}
                                    alt={article.title}
                                    ref={imageRef}
                                    className="pointer-events-none absolute top-0 left-0 h-full w-full bg-white object-cover"
                                />
                            </div>
                            <div className="relative mt-4 grid grid-cols-5 gap-1">
                                <button
                                    className="absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white"
                                    onClick={prev}
                                >
                                    <BsChevronLeft />
                                </button>
                                {currentImages.map((img) => {
                                    const isActive = img === activeImage;
                                    return (
                                        <div
                                            className="relative w-full pt-[100%]"
                                            key={img}
                                            onMouseEnter={() =>
                                                handleChooseImage(img)
                                            }
                                            aria-hidden="true"
                                            role="button"
                                            tabIndex={0}
                                        >
                                            <img
                                                src={img}
                                                alt={article.title}
                                                className="absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover"
                                            />
                                            {isActive && (
                                                <div className="border-primary absolute inset-0 border-2" />
                                            )}
                                        </div>
                                    );
                                })}
                                <button
                                    className="absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white"
                                    onClick={next}
                                >
                                    <BsChevronRight />
                                </button>
                            </div>
                        </div>

                        {/* article detail */}
                        <div className="col-span-10 space-y-6 md:col-span-6">
                            <p className="break-words text-4xl">
                                {article.title}
                            </p>

                            <div className="flex justify-between">
                                <p className="text-2xl text-primary-400 ">
                                    {article.price ? article.price : 'Miễn phí'}
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

                            <p>Category: {article.category.name}</p>

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

                    {/* user */}
                    <div className="my-5 flex items-center justify-between border border-gray-400 p-5">
                        <div className="flex items-center space-x-4">
                            <Avatar
                                src={
                                    article.user.avatar ||
                                    '/images/avatar-fallback.png'
                                }
                            />
                            <p>{article.user.username}</p>
                        </div>
                        <div>
                            <p>Do something</p>
                        </div>
                    </div>

                    {/* description, comment */}
                    <TabView
                        tabs={[
                            {
                                label: 'Description',
                                content: (
                                    <div className="min-h-[400px] bg-white p-2 shadow-3xl">
                                        {article.description}
                                    </div>
                                ),
                            },
                            { label: 'Comments', content: <Comment /> },
                            {
                                label: 'MinhQuan articles',
                                content: <div>Article</div>,
                            },
                        ]}
                    />

                    {/* related articles */}
                    <div className="my-8">
                        <h3 className="text-4xl font-bold">Related articles</h3>
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
        variables: { limit: limitArticlesPaginated },
    });

    return {
        paths:
            data &&
            data.articles?.paginatedArticles
                .map((article) => {
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
