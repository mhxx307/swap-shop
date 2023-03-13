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
import DOMPurify from 'dompurify';

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
import { getIdFromNameId, formatCurrency } from '@/utils';

const ArticleDetailPage = () => {
    const router = useRouter();
    const [id, setId] = useState('');

    const { data: articleData, loading } = useArticleQuery({
        variables: {
            articleId: id,
        },
    });

    const article = articleData?.article;
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

    useEffect(() => {
        setId(getIdFromNameId(router.query.articleId as string));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

        // const { naturalHeight, naturalWidth } = image;
        // const width = naturalHeight;
        // const height = naturalWidth;

        const naturalWidth = 800;
        const naturalHeight = 800;
        const width = naturalWidth;
        const height = naturalHeight;

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

    if (!loading && !article) {
        return <div>Not have data to render</div>;
    }

    return (
        <>
            <Head title={article.title} description={article.description} />
            <ClientOnly>
                <div className="container header-height">
                    <div className="bg-white p-4 shadow">
                        <div className="grid grid-cols-12 gap-9">
                            {/* images slider */}
                            <div className="col-span-full md:col-span-5">
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
                            <div className="col-span-full space-y-6 md:col-span-7">
                                <p className="break-words text-4xl">
                                    {article.title}
                                </p>

                                <div className="flex justify-between">
                                    <p className="text-2xl text-primary-400 ">
                                        {article.price
                                            ? formatCurrency(article.price)
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

                                <p>
                                    Category:{' '}
                                    {article.categories.map((category) => (
                                        <span key={category.id}>
                                            {category.name}
                                        </span>
                                    ))}
                                </p>

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
                                    <div className="mt-8">
                                        <div className=" bg-white p-4 shadow">
                                            <div className="rounded bg-gray-50 p-4 text-lg capitalize text-slate-700">
                                                Mô tả sản phẩm
                                            </div>
                                            <div className="mx-4 mt-12 mb-4 text-sm leading-loose">
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: DOMPurify.sanitize(
                                                            article.description,
                                                        ),
                                                    }}
                                                />
                                            </div>
                                        </div>
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
        variables: { queryConfig: { limit: '30' } },
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
        variables: { articleId: context.params?.articleId },
    });

    return addApolloState(apolloClient, { props: {} });
};

export default ArticleDetailPage;
