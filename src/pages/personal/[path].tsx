import {
    Button,
    ClientOnly,
    Head,
    Image,
    Pagination,
    TabView,
} from '@/components/shared';
import { useArticlesQuery, useUserByIdQuery } from '@/generated/graphql';
import { useQueryConfig } from '@/hooks';
import { generateNameId, getIdFromNameId } from '@/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { BsFillStarFill } from 'react-icons/bs';

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

    useEffect(() => {
        setId(getIdFromNameId(router.query.path as string));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Head />
            <ClientOnly>
                <div className="container header-height">
                    <div className="grid grid-cols-12 shadow">
                        <div className=" col-span-4 rounded-sm bg-white p-6">
                            {/* info store */}
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
                                    src={'/images/login-background.avif'}
                                    alt="article"
                                    classnamewrapper="absolute top-0 w-full h-full"
                                />
                            </div>
                            <div className=" mt-12 rounded-sm bg-white">
                                <div className="flex justify-between">
                                    <h3 className="mb-2 ml-4 font-bold text-black">
                                        {user?.fullName}
                                    </h3>
                                    <h5 className="text-blue-500">
                                        {user?.rating}
                                    </h5>
                                </div>

                                <Button
                                    className="btn-wishlist mt-2 w-full"
                                    LeftIcon={BsFillStarFill}
                                    iconClassName="w-4 h-4"
                                >
                                    Chat với người bán
                                </Button>
                            </div>
                        </div>

                        {/* info detail */}
                        <div className="col-span-8 ml-4">
                            {/* about, article */}
                            <TabView
                                tabs={[
                                    {
                                        label: 'About',
                                        content: (
                                            <div className="col-span-8 mt-8 mb-4 border-t-4 bg-white p-4 shadow">
                                                <div className="rounded bg-gray-50 p-4 text-lg capitalize text-slate-700">
                                                    Gioi Thieu
                                                </div>
                                            </div>
                                        ),
                                    },
                                    {
                                        label: 'Articles',
                                        content: (
                                            <div>
                                                {articles?.map((article) => (
                                                    <Link
                                                        href={`/articles/${generateNameId(
                                                            {
                                                                id: article.id,
                                                                name: article.title,
                                                            },
                                                        )}`}
                                                        key={article.id}
                                                        className={` mt-1 block cursor-pointer rounded-sm bg-white p-4`}
                                                    >
                                                        <div className="flex ">
                                                            <Image
                                                                src={
                                                                    article
                                                                        .images[0]
                                                                }
                                                                alt="article"
                                                                classnamewrapper="flex-shrink-0 w-[150px] h-[150px] object-cover rounded-lg"
                                                            />

                                                            <div className="relative ml-4 w-full ">
                                                                <h2 className="font-bold uppercase">
                                                                    {
                                                                        article.title
                                                                    }
                                                                </h2>
                                                                <p className="mt-2 text-primary-500">
                                                                    {article.price ===
                                                                    0
                                                                        ? 'Free'
                                                                        : article.price}
                                                                </p>
                                                                <div className="absolute bottom-0 left-0 flex w-full justify-between">
                                                                    <p>Share</p>
                                                                    <AiFillHeart className="h-6 w-6 text-primary-500" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                                <Pagination
                                                    pageSize={
                                                        articlesData?.articles
                                                            .data?.pagination
                                                            .page_size as number
                                                    }
                                                    queryConfig={queryConfig}
                                                />
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

export default StoreDetail;
