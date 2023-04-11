import PublishedCard from '@/components/features/articles/PublishedCard';
import { ClientOnly, Head, Image, TabView } from '@/components/shared';
import { STATUS_ARTICLE } from '@/constants';
import { Article, useArticlesQuery, useMeQuery } from '@/generated/graphql';
import { useQueryConfig } from '@/hooks';

function PublishedPage() {
    const { data: meData } = useMeQuery();

    const me = meData?.me;

    const queryConfig = useQueryConfig();

    const { data: articlesData } = useArticlesQuery({
        variables: {
            queryConfig: { ...queryConfig, userId: me?.id },
        },
        skip: !me,
        fetchPolicy: 'no-cache',
    });

    const articles = articlesData?.articles.data?.articles;

    const articlesPending = articles?.filter((value) => {
        return value.status === STATUS_ARTICLE.PENDING;
    });

    const articlesApproved = articles?.filter((value) => {
        return value.status === STATUS_ARTICLE.APPROVED;
    });

    const articlesRejected = articles?.filter((value) => {
        return value.status === STATUS_ARTICLE.REJECTED;
    });

    return (
        <>
            <Head />
            <ClientOnly>
                <div className="container header-height">
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
                                        className="h-20 w-20 rounded-[50%] object-cover text-center ss:mr-[24px]"
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
                                            <div>
                                                {articlesPending &&
                                                    articlesPending?.map(
                                                        (article) => (
                                                            <PublishedCard
                                                                key={article.id}
                                                                article={
                                                                    article as Article
                                                                }
                                                            />
                                                        ),
                                                    )}
                                            </div>
                                        ),
                                    },
                                    {
                                        label: 'Đang hiển thị',
                                        content: (
                                            <div>
                                                {articlesApproved &&
                                                    articlesApproved?.map(
                                                        (article) => (
                                                            <PublishedCard
                                                                key={article.id}
                                                                article={
                                                                    article as Article
                                                                }
                                                            />
                                                        ),
                                                    )}
                                            </div>
                                        ),
                                    },
                                    {
                                        label: 'Bị từ chối',
                                        content: (
                                            <div>
                                                {articlesRejected &&
                                                    articlesRejected?.map(
                                                        (article) => (
                                                            <PublishedCard
                                                                key={article.id}
                                                                article={
                                                                    article as Article
                                                                }
                                                            />
                                                        ),
                                                    )}
                                            </div>
                                        ),
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </ClientOnly>
        </>
    );
}

export default PublishedPage;
