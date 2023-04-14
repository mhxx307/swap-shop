import PublishedCard from '@/components/features/articles/PublishedCard';
import {
    Auth,
    ClientOnly,
    Head,
    Image,
    Spinner,
    TabView,
} from '@/components/shared';
import { STATUS_ARTICLE } from '@/constants';
import { useAuthContext } from '@/contexts/AuthContext';
import { Article, useArticlesQuery } from '@/generated/graphql';
import { useQueryConfig } from '@/hooks';

function PublishedPage() {
    const { profile } = useAuthContext();
    const queryConfig = useQueryConfig();

    const { data: articlesData } = useArticlesQuery({
        variables: {
            queryConfig: { ...queryConfig, userId: profile?.id },
        },
        skip: !profile,
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

    if (!profile) {
        return <Spinner />;
    }

    return (
        <>
            <Head />
            <ClientOnly>
                <Auth>
                    <div className="container header-height">
                        <div className="grid grid-cols-12 shadow">
                            {' '}
                            <div className=" col-span-12 rounded-sm bg-white p-6 dark:bg-[#343444]">
                                <div className="mb-4 flex items-end justify-between">
                                    <div className="flex items-end">
                                        <Image
                                            src={
                                                profile?.avatar ||
                                                '/images/avatar-fallback.png'
                                            }
                                            alt="Avatar"
                                            className="h-20 w-20 rounded-[50%] object-cover text-center ss:mr-[24px]"
                                        />

                                        <div>
                                            <h3 className="mb-2 font-semibold">
                                                {profile.fullName}
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
                                                                    key={
                                                                        article.id
                                                                    }
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
                                                                    key={
                                                                        article.id
                                                                    }
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
                                                                    key={
                                                                        article.id
                                                                    }
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
                </Auth>
            </ClientOnly>
        </>
    );
}

export default PublishedPage;
