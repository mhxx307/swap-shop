import { ArticleListByCategory } from '@/components/features/articles';
import {
    ClientOnly,
    CommonSection,
    Head,
    Image,
    TabView,
} from '@/components/shared';
import {
    Article,
    QueryConfig,
    useArticlesQuery,
    useUserByIdQuery,
} from '@/generated/graphql';
import { useQueryConfig } from '@/hooks';
import { getIdFromNameId } from '@/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function StoreDetail() {
    const router = useRouter();
    const [id, setId] = useState('');

    const { data: userData } = useUserByIdQuery({
        variables: {
            userId: id,
        },
    });

    const user = userData?.getUserById;

    const queryConfig = useQueryConfig();

    const { data: articlesData } = useArticlesQuery({
        variables: {
            queryConfig: queryConfig,
        },
        skip: !userData,
    });
    const articles = articlesData?.articles.data?.articles;
    const pageSize = articlesData?.articles.data?.pagination.page_size;

    useEffect(() => {
        if (router.query.path) {
            setId(getIdFromNameId(router.query.path as string));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.query.path]);

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <>
            <Head />
            <ClientOnly>
                <div className="flex w-full flex-col">
                    <CommonSection title={`User: ${user.username}`} />
                    <div className="container my-12">
                        <div className="grid grid-cols-12">
                            <div className="col-span-4 rounded-sm">
                                {/* info store */}
                                <div className="bg-white p-6 dark:bg-[#343444]">
                                    <div className="relative pt-[calc(75%)]">
                                        {/* user avatar */}
                                        <Image
                                            src={'/images/avatar-fallback.png'}
                                            alt="Avatar"
                                            className="h-full w-full rounded-[50%] object-cover text-center ss:mx-[24px]"
                                            classnamewrapper="flex-center text-sm z-50 w-24 h-24 absolute left-[20px] bottom-[-40px]"
                                        />

                                        {/* article image */}
                                        <Image
                                            src={
                                                '/images/login-background.avif'
                                            }
                                            alt="article"
                                            classnamewrapper="absolute top-0 w-full h-full"
                                        />
                                    </div>
                                    <div className="mt-12 rounded-sm">
                                        <div className="flex justify-between">
                                            <h3 className="mb-2 ml-4 font-bold">
                                                {user?.fullName}
                                            </h3>
                                            <h5 className="text-blue-500">
                                                {user?.rating}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* info detail */}
                            <div className="col-span-8 ml-4">
                                {/* about, article */}
                                <TabView
                                    tabs={[
                                        {
                                            label: 'About',
                                            content: <About />,
                                        },
                                        {
                                            label: 'Articles',
                                            content: (
                                                <ArticleListByCategory
                                                    articles={
                                                        articles as Article[]
                                                    }
                                                    pageSize={
                                                        pageSize as number
                                                    }
                                                    queryConfig={
                                                        queryConfig as QueryConfig
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
            </ClientOnly>
        </>
    );
}

export default StoreDetail;

const About = () => {
    return (
        <div className="col-span-8 mt-8 mb-4 border-t-4 bg-white p-4 shadow">
            <div className="rounded bg-gray-50 p-4 text-lg capitalize text-slate-700">
                Gioi Thieu
            </div>
        </div>
    );
};
