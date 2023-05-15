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
import ReactTextareaAutosize from 'react-textarea-autosize';
import { ArticleList } from '@/components/features/articles';
import { Comment } from '@/components/features/comment';
import {
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
    Conversation,
    GetConversationDocument,
    GetConversationQuery,
    QueryConfig,
    QueryGetConversationArgs,
    User,
    useArticleQuery,
    useArticlesQuery,
    useCountFavoritesForArticleQuery,
    useGetConversationsQuery,
    useMeQuery,
    useNewConversationMutation,
    useReportMutation,
} from '@/generated/graphql';
import { addApolloState, initializeApollo } from '@/libs/apolloClient';
import {
    formatNumberToSocialStyle,
    generateNameId,
    getIdFromNameId,
} from '@/utils';

import 'tippy.js/dist/tippy.css';
import { STATUS_ARTICLE, path } from '@/constants';
import Link from 'next/link';
import UserInfo from '@/components/features/comment/UserInfo';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeading,
    DialogTrigger,
} from '@/components/shared/Dialog';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ArticleDetailPage = () => {
    const { data: me } = useMeQuery();
    const router = useRouter();
    const [id, setId] = useState('');
    const { refetch } = useGetConversationsQuery();
    const [currentChat, setCurrentChat] = useState<Conversation | null>(null);
    console.log(currentChat);
    const { t } = useTranslation('common');

    const apolloClient = initializeApollo();
    const [newConversationMutation] = useNewConversationMutation();

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

    const queryConfig: QueryConfig = {
        page: '1',
        limit: '20',
        categories: articleData?.article?.categories.map((c) => c.id),
        status: STATUS_ARTICLE.APPROVED,
    };
    const countFavorites = countFavoritesData?.countFavoritesForArticle;

    const { data: articlesData } = useArticlesQuery({
        variables: {
            queryConfig: queryConfig,
        },
        skip: !articleData?.article?.categories,
        fetchPolicy: 'no-cache',
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
    }, [router.query.articleId]);

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

    const handleNewConversation = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        e.preventDefault();
        const { data: conversationData } = await apolloClient.query<
            GetConversationQuery,
            QueryGetConversationArgs
        >({
            query: GetConversationDocument,
            variables: {
                articleId: id,
                userId: article.user.id,
            },
        });

        // If the conversation already exists, set it as current chat
        if (conversationData.getConversation) {
            setCurrentChat(conversationData.getConversation as Conversation);
            router.push(
                `${path.chat}/${generateNameId({
                    id: article.user.id,
                    name: id,
                })}`,
            );
            refetch();
            return;
        }

        // If the conversation doesn't exist, create a new one
        await newConversationMutation({
            variables: {
                articleId: id,
                userId: article.user.id,
            },
            onCompleted: (data) => {
                refetch();
                setCurrentChat(
                    data.newConversation.conversation as Conversation,
                );
                router.push(
                    `${path.chat}/${generateNameId({
                        id: article.user.id,
                        name: id,
                    })}`,
                );
            },
        });
    };

    return (
        <>
            <Head title={article.title} description={article.description} />
            <ClientOnly>
                <div className="flex w-full flex-col">
                    <CommonSection title={article.title} />
                    <div className="container mt-[30px]">
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
                                            {me?.me &&
                                                me.me.id !==
                                                    article.user.id && (
                                                    <Tippy
                                                        content={`Contact with ${article.user.username}`}
                                                    >
                                                        <button
                                                            onClick={
                                                                handleNewConversation
                                                            }
                                                        >
                                                            <RiSendPlaneLine className="h-6 w-6 cursor-pointer transition-opacity hover:opacity-80" />
                                                        </button>
                                                    </Tippy>
                                                )}
                                            <Popover
                                                renderPopover={
                                                    <MoreAction
                                                        article={
                                                            article as Article
                                                        }
                                                    />
                                                }
                                            >
                                                <AiOutlineMore className="h-6 w-6 cursor-pointer transition-opacity hover:opacity-80" />
                                            </Popover>
                                        </div>
                                    </div>

                                    <div className="mb-4 flex items-center">
                                        <p className="mr-4 text-sm">
                                            {t('category')}
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
                                        <Popover
                                            isArrow={false}
                                            renderPopover={
                                                <UserInfo
                                                    user={article.user as User}
                                                />
                                            }
                                            placement="bottom-start"
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
                                                        className="h-full w-full rounded-full object-cover"
                                                    />
                                                </div>
                                            </Link>
                                        </Popover>

                                        <div>
                                            <p className="mb-0 mt-0 text-xs font-light">
                                                {t('create_by')}
                                            </p>
                                            <h6 className="text-sm font-medium text-black dark:text-white">
                                                {article.user.username}
                                            </h6>
                                        </div>
                                    </div>

                                    <div className="mx-4 mt-12 mb-4 text-sm leading-loose">
                                        <h3 className="text-2xl">
                                            {t('description')}:
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
                                        label: t('comments') || 'Comments',
                                        content: (
                                            <Comment
                                                article={article as Article}
                                            />
                                        ),
                                    },
                                ]}
                            />
                        </div>

                        {/* related articles */}
                        <div className="mt-20">
                            <h3 className="mb-6 text-4xl font-bold">
                                {t('related_articles')}
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

export default ArticleDetailPage;

export const getStaticPaths = async ({ locales }: { locales: string[] }) => {
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.query<ArticlesQuery>({
        query: ArticlesDocument,
        variables: { queryConfig: { limit: '30' } },
    });

    return {
        paths:
            data.articles?.data?.articles &&
            data.articles?.data?.articles.length > 0
                ? data.articles?.data?.articles
                      .map((article) => {
                          return locales.map((locale) => {
                              return {
                                  params: { articleId: article.id.toString() },
                                  locale,
                              };
                          });
                      })
                      .flat()
                : [],
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

const MoreAction = ({ article }: { article: Article }) => {
    const { t } = useTranslation('market');
    const reportDescription = [
        t('reason1'),
        t('reason2'),
        t('reason3'),
        t('reason4'),
        t('reason5'),
    ];
    const [isChecked, setIsChecked] = useState(0);
    const [reason, setReason] = useState(reportDescription[isChecked]);
    const [description, setDescription] = useState('');

    const [insertReport] = useReportMutation();
    console.log(reason);

    const handleInsertReport = async () => {
        if (!description) {
            toast.info(t('desc_required') || 'Bạn phải nhập mô tả cho báo cáo');
            return;
        } else {
            await insertReport({
                variables: {
                    articleId: article.id,
                    description: description,
                    reason: reason,
                },
            });
            toast.success(t('report_success') || 'Báo cáo thành công');
            setDescription('');
        }
    };

    return (
        <div className="bg-white">
            <Dialog>
                <DialogTrigger className="flex-center bg-white px-6 py-3 hover:bg-gray-200">
                    <VscReport className="mr-2" /> {t('report')}
                </DialogTrigger>
                <DialogContent className="m-[15px] w-[70vh] rounded-md bg-white shadow-md dark:bg-primaryDark dark:text-white">
                    <DialogHeading className="relative  bg-gray-200 p-2 text-center  text-black dark:bg-[#343444] dark:text-white">
                        {t('report_text')}
                        <DialogClose className="absolute top-1 right-2">
                            x
                        </DialogClose>
                    </DialogHeading>

                    <DialogDescription className="p-2">
                        <ul>
                            {' '}
                            {t('call')}
                            {reportDescription.map((report, index) => (
                                <li key={report} className="ml-2">
                                    <input
                                        type="radio"
                                        className="mr-2"
                                        checked={isChecked === index}
                                        onChange={() => {
                                            setReason(report);
                                            setIsChecked(index);
                                        }}
                                    />
                                    {report}
                                </li>
                            ))}
                        </ul>
                        <p>{t('detail')}</p>
                        <ReactTextareaAutosize
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            minRows={3}
                            maxRows={6}
                            placeholder={
                                t('desc_placeholder') ||
                                'Ghi rõ nội dung cần báo cáo'
                            }
                            className=" mt-2 w-full rounded-sm p-2 text-black outline"
                        />
                        <Button
                            className="flex-center mt-2 w-full"
                            secondary
                            onClick={handleInsertReport}
                        >
                            {' '}
                            {t('btn_report')}
                        </Button>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </div>
    );
};
