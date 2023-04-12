import DOMPurify from 'dompurify';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BsBag, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { AiOutlineEye, AiOutlineHeart, AiOutlineMore } from 'react-icons/ai';
import { RiSendPlaneLine } from 'react-icons/ri';
import Tippy from '@tippyjs/react';
import TimeAgo from 'timeago-react';
import { VscReport } from 'react-icons/vsc';

import { ArticleList } from '@/components/features/articles';
import { Comment } from '@/components/features/comment';
import {
    Breadcrumb,
    Button,
    ClientOnly,
    CommonSection,
    Head,
    Popover,
    TabView,
} from '@/components/shared';
import {
    Article,
    ArticleDocument,
    ArticleQuery,
    ArticlesDocument,
    ArticlesQuery,
    QueryConfig,
    useArticleQuery,
    useArticlesQuery,
    useCountFavoritesForArticleQuery,
} from '@/generated/graphql';
import { addApolloState, initializeApollo } from '@/libs/apolloClient';
import { formatNumberToSocialStyle, getIdFromNameId } from '@/utils';

import 'tippy.js/dist/tippy.css';
import { path } from '@/constants';
import Link from 'next/link';

const ArticleDetailPage = () => {
    const router = useRouter();
    const [id, setId] = useState('');

    const { data: countFavoritesData } = useCountFavoritesForArticleQuery({
        variables: {
            articleId: id,
        },
        skip: !id,
        fetchPolicy: 'no-cache',
    });

    const { data: articleData, loading } = useArticleQuery({
        variables: {
            articleId: id,
        },
        skip: !id,
        fetchPolicy: 'no-cache',
    });

    console.log(articleData);

    const queryConfig: QueryConfig = {
        page: '1',
        limit: '20',
        categories: articleData?.article?.categories.map((c) => c.id),
    };
    const countFavorites = countFavoritesData?.countFavoritesForArticle;

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
    }, [router]);

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
                <div className="flex w-full flex-col">
                    <CommonSection title={article.title} />
                    <div className="container mt-[30px]">
                        <Breadcrumb />
                        <div className="grid grid-cols-12">
                            {/* image */}
                            <div className="col-span-6">
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
                                            className="pointer-events-none absolute top-0 left-0 h-full w-full rounded-md bg-white object-cover"
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
                                            const isActive =
                                                img === activeImage;
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
                                </div>
                            </div>

                            {/* article detail */}
                            <div className="col-span-6 ml-4">
                                <div>
                                    <h2 className="text-xl">{article.title}</h2>
                                    <span className="text-xs text-[#919eab]">
                                        <TimeAgo
                                            datetime={article.createdDate}
                                        />
                                    </span>

                                    <div className="mt-4 mb-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center">
                                                <AiOutlineEye className="mr-2" />{' '}
                                                {formatNumberToSocialStyle(
                                                    article.views,
                                                )}
                                            </span>
                                            <span className="flex items-center">
                                                <AiOutlineHeart className="mr-2" />{' '}
                                                {countFavorites
                                                    ? formatNumberToSocialStyle(
                                                          countFavorites,
                                                      )
                                                    : 0}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Tippy
                                                content={`Contact with ${article.user.username}`}
                                            >
                                                <span>
                                                    <RiSendPlaneLine className="h-6 w-6 cursor-pointer transition-opacity hover:opacity-80" />
                                                </span>
                                            </Tippy>
                                            <Popover
                                                renderPopover={<MoreAction />}
                                            >
                                                <AiOutlineMore className="h-6 w-6 cursor-pointer transition-opacity hover:opacity-80" />
                                            </Popover>
                                        </div>
                                    </div>

                                    <div className="mb-4 flex items-center">
                                        <p className="mr-4 text-sm">
                                            Thể loại:
                                        </p>
                                        <ul>
                                            {article.categories.map(
                                                (category) => (
                                                    <li
                                                        key={category.id}
                                                        className="text-sm"
                                                    >
                                                        {category.name}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>

                                    <div className="flex w-[50%] items-center gap-3 rounded-[7px]  bg-white p-[15px] shadow dark:bg-[#343434]">
                                        <Tippy
                                            content={
                                                <UserInfo
                                                    article={article as Article}
                                                />
                                            }
                                            placement="top-start"
                                        >
                                            <Link
                                                href={`${path.personal}/${article.user.id}`}
                                            >
                                                <div className="h-[40px] w-[40px] flex-shrink-0 cursor-pointer object-cover">
                                                    <img
                                                        src={
                                                            article.user
                                                                .avatar ||
                                                            '/images/avatar-fallback.png'
                                                        }
                                                        alt=""
                                                        className="w-full rounded-full"
                                                    />
                                                </div>
                                            </Link>
                                        </Tippy>

                                        <div>
                                            <p className="mb-0 mt-0 text-xs font-light">
                                                Created By
                                            </p>
                                            <h6 className="text-sm font-medium text-black dark:text-white">
                                                {article.user.username}
                                            </h6>
                                        </div>
                                    </div>

                                    <div className="mx-4 mt-12 mb-4 text-sm leading-loose">
                                        <h3 className="text-2xl">
                                            Description:
                                        </h3>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(
                                                    article.description,
                                                ),
                                            }}
                                        />
                                    </div>

                                    <Button
                                        secondary
                                        className="flex-center w-full rounded-full py-3 text-white"
                                        LeftIcon={BsBag}
                                        iconClassName="mr-2"
                                    >
                                        Put to your bag
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* description, comment */}
                        <div className="mt-12">
                            <TabView
                                tabs={[
                                    {
                                        label: 'Comments',
                                        content: <Comment id={id} />,
                                    },
                                    {
                                        label: 'MinhQuan articles',
                                        content: <div>Article</div>,
                                    },
                                ]}
                            />
                        </div>

                        {/* related articles */}
                        <div className="mt-20">
                            <h3 className="mb-6 text-4xl font-bold">
                                Related articles
                            </h3>
                            {articles && (
                                <ArticleList articles={articles as Article[]} />
                            )}
                        </div>
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

const UserInfo = ({ article }: { article: Article }) => {
    return (
        <div className="flex flex-col gap-3 rounded-[7px]  bg-white p-[15px] shadow dark:bg-[#343434]">
            <div className="flex items-center">
                <p className="mr-2 text-black dark:text-white">Username: </p>
                <p className="text-[#919eab]">{article.user.username}</p>
            </div>
            <div className="flex items-center">
                <p className="mr-2 text-black dark:text-white">
                    Phone number:{' '}
                </p>
                <p className="text-[#919eab]">{article.user.phoneNumber}</p>
            </div>
            <div className="flex items-center">
                <p className="mr-2 text-black dark:text-white">Address: </p>
                <p className="text-[#919eab]">{article.user.address}</p>
            </div>
            <div className="flex items-center">
                <p className="mr-2 text-black dark:text-white">Full name: </p>
                <p className="text-[#919eab]">{article.user.fullName}</p>
            </div>
            <div className="flex items-center">
                <p className="mr-2 text-black dark:text-white">
                    Participation date:{' '}
                </p>
                <span className="text-[#919eab]">
                    <TimeAgo datetime={article.user.createdDate} />
                </span>
            </div>
        </div>
    );
};

const MoreAction = () => {
    return (
        <div className="bg-white">
            <Button
                LeftIcon={VscReport}
                className="flex-center bg-white px-6 py-3 hover:bg-gray-200"
                iconClassName="mr-2"
            >
                Report
            </Button>
        </div>
    );
};
