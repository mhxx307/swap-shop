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
    QueryConfig,
    useArticleQuery,
    useArticlesQuery,
} from '@/generated/graphql';
import { getIdFromNameId, formatCurrency, generateNameId } from '@/utils';
import { ArticleList } from '@/components/features/articles';
import TimeAgo from 'timeago-react';

const ArticleDetailPage = () => {
    const router = useRouter();
    const [id, setId] = useState('');

    const { data: articleData, loading } = useArticleQuery({
        variables: {
            articleId: id,
        },
        skip: !(id.length > 0),
    });

    console.log(articleData);

    const queryConfig: QueryConfig = {
        page: '1',
        limit: '20',
        categories: articleData?.article?.categories.map((c) => c.id),
    };

    const { data: articlesData } = useArticlesQuery({
        variables: {
            queryConfig: queryConfig,
        },
        skip: !articleData,
    });
    const articles = articlesData?.articles.data?.articles;

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

        const naturalWidth = 2000;
        const naturalHeight = 2000;
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
                    <div className="grid grid-cols-12 shadow">
                        <div className=" col-span-8 rounded-sm bg-white p-6">
                            {/* images slider */}
                            <div>
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
                                                    <div className="absolute inset-0 border-2 border-primary-300" />
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
                                <p className="mt-4 break-words text-4xl">
                                    {article.title}
                                </p>

                                <div className="mt-2 flex justify-between">
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
                                <p>
                                    Category:{' '}
                                    {article.categories.map((category) => (
                                        <span key={category.id}>
                                            {category.name}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        </div>
                        {/* article detail */}
                        <div className="col-span-4 ml-4">
                            <div className={` rounded-sm bg-white p-4`}>
                                <div className="flex justify-between ">
                                    <div className="flex">
                                        <Avatar
                                            src={article.user.avatar as string}
                                        />
                                        <div className="ml-2 py-1 text-xs text-gray-400">
                                            <div className="font-semibold text-gray-600">
                                                {article.user.username}
                                            </div>{' '}
                                            <TimeAgo
                                                datetime={article.createdDate}
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        className="btn-wishlist h-4 "
                                        LeftIcon={BsFillStarFill}
                                        iconClassName="w-4 h-4"
                                        onClick={() =>
                                            router.push(
                                                `/personal/${generateNameId({
                                                    id: article.user.id,
                                                    name: article.user.username,
                                                })}`,
                                            )
                                        }
                                    >
                                        Xem cửa hàng
                                    </Button>
                                </div>

                                <div className="mt-2 flex items-center space-x-6">
                                    <span>Contact:</span>
                                    <FaFacebookF />
                                    <FaTwitter />
                                    <FaLink />
                                </div>
                            </div>

                            <div className=" mt-2 rounded-sm bg-white p-4">
                                <h3 className="mb-2 font-bold text-black">
                                    Liên hệ với người bán
                                </h3>
                                <ul className="overflow-y-hidden whitespace-nowrap p-2">
                                    <li className="dark:bg-blac mr-2 inline-block rounded-full  bg-slate-300 p-2 hover:cursor-pointer dark:bg-black">
                                        Còn hàng không ạ
                                    </li>
                                    <li className="mr-2 inline-block rounded-full bg-slate-300 p-2 hover:cursor-pointer dark:bg-black">
                                        Mặt hàng ở đâu
                                    </li>
                                    <li className="mr-2 inline-block rounded-full  bg-slate-300 p-2 hover:cursor-pointer dark:bg-black">
                                        Làm thế nào để biết địa chỉ
                                    </li>
                                </ul>
                                <Button
                                    className="btn-contact mt-2 w-full"
                                    primary
                                    LeftIcon={BsFillTelephoneFill}
                                    iconClassName="w-4 h-4"
                                    // onClick={handleContact}
                                >
                                    Liên hệ
                                </Button>
                                <Button
                                    className="btn-wishlist mt-2 w-full"
                                    LeftIcon={BsFillStarFill}
                                    iconClassName="w-4 h-4"
                                >
                                    Chat với người bán
                                </Button>
                            </div>
                        </div>

                        <div className="col-span-8 mt-8 mb-4 border-t-4 bg-white p-4 shadow">
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

                    {/* description, comment */}
                    <TabView
                        tabs={[
                            { label: 'Comments', content: <Comment id={id} /> },
                            {
                                label: 'MinhQuan articles',
                                content: <div>Article</div>,
                            },
                        ]}
                    />

                    {/* related articles */}
                    <div className="my-8">
                        <h3 className="text-4xl font-bold">Related articles</h3>
                        {articles && (
                            <ArticleList articles={articles as Article[]} />
                        )}
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
            data.articles?.data?.articles
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
