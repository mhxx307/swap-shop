import PublishedCard from '@/components/features/articles/PublishedCard';
import {
    Auth,
    ClientOnly,
    CommonSection,
    Head,
    Image,
    TabView,
} from '@/components/shared';
import { STATUS_ARTICLE } from '@/constants';
import { Article, useArticlesQuery, useMeQuery } from '@/generated/graphql';
import { useQueryConfig } from '@/hooks';

function PublishedPage() {
    const { data: meData } = useMeQuery();

    const me = meData?.me;

    const queryConfig = useQueryConfig();

    const { data: articlesApprovedData } = useArticlesQuery({
        variables: {
            queryConfig: { ...queryConfig, userId: me?.id },
        },
        skip: !me,
        fetchPolicy: 'no-cache',
    });
    const { data: articlesRejectedData } = useArticlesQuery({
        variables: {
            queryConfig: {
                ...queryConfig,
                userId: me?.id,
                status: STATUS_ARTICLE.REJECTED,
            },
        },
        skip: !me,
        fetchPolicy: 'no-cache',
    });
    const { data: articlesPendingData } = useArticlesQuery({
        variables: {
            queryConfig: {
                ...queryConfig,
                userId: me?.id,
                status: STATUS_ARTICLE.PENDING,
            },
        },
        skip: !me,
        fetchPolicy: 'no-cache',
    });
    const { data: articlesBlockedData } = useArticlesQuery({
        variables: {
            queryConfig: {
                ...queryConfig,
                userId: me?.id,
                status: STATUS_ARTICLE.BLOCKED,
            },
        },
        skip: !me,
        fetchPolicy: 'no-cache',
    });

    const articlesApproved = articlesApprovedData?.articles.data?.articles;
    const articlesRejected = articlesRejectedData?.articles.data?.articles;
    const articlesPending = articlesPendingData?.articles.data?.articles;
    const articlesBlocked = articlesBlockedData?.articles.data?.articles;

    return (
        <>
            <Head />
            <ClientOnly>
                <Auth>
                    <div className="flex w-full flex-col">
                        <CommonSection title="Quản lý bài biết" />
                        <div className="container my-10">
                            <div className="grid grid-cols-12 shadow">
                                {' '}
                                <div className=" col-span-12 rounded-sm bg-white p-6 dark:bg-[#343444]">
                                    <div className="mb-4 flex items-end justify-between">
                                        <div className="flex items-end">
                                            <Image
                                                src={
                                                    me?.avatar ||
                                                    '/images/avatar-fallback.png'
                                                }
                                                alt="Avatar"
                                                className="h-20 w-20 rounded-[50%] text-center ss:mr-[24px]"
                                            />

                                            <div>
                                                <h3 className="mb-2 font-semibold">
                                                    {me?.fullName}
                                                </h3>
                                                <h5 className="cursor-pointer rounded-lg border border-secondary pl-6 pr-6 text-secondary hover:bg-slate-50">
                                                    Trang chủ
                                                </h5>
                                            </div>
                                        </div>
                                        <div>Có gì mới ?</div>
                                    </div>
                                    <TabView
                                        tabs={[
                                            {
                                                label: 'Chờ duyệt',
                                                content: (
                                                    <ArticleList
                                                        articles={
                                                            articlesPending as Article[]
                                                        }
                                                    />
                                                ),
                                            },
                                            {
                                                label: 'Đang hiển thị',
                                                content: (
                                                    <ArticleList
                                                        articles={
                                                            articlesApproved as Article[]
                                                        }
                                                    />
                                                ),
                                            },
                                            {
                                                label: 'Bị từ chối',
                                                content: (
                                                    <ArticleList
                                                        articles={
                                                            articlesRejected as Article[]
                                                        }
                                                    />
                                                ),
                                            },
                                            {
                                                label: 'Bị chặn',
                                                content: (
                                                    <ArticleList
                                                        articles={
                                                            articlesBlocked as Article[]
                                                        }
                                                    />
                                                ),
                                            },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Auth>
            </ClientOnly>
        </>
    );
}

export default PublishedPage;

const ArticleList = ({ articles }: { articles: Article[] }) => {
    return (
        <div>
            {articles &&
                articles?.map((article) => (
                    <PublishedCard
                        key={article.id}
                        article={article as Article}
                    />
                ))}
        </div>
    );
};
