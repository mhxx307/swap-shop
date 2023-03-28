import { ArticleListByCategory } from '@/components/features/articles';
import { Comment } from '@/components/features/comment';
import { Button, ClientOnly, Head, Image, TabView } from '@/components/shared';
import { Article, useArticlesQuery } from '@/generated/graphql';
import { useQueryConfig } from '@/hooks';
import { getIdFromNameId, getNameFromNameId } from '@/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsFillStarFill } from 'react-icons/bs';

function StoreDetail() {
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
                                    classNameWrapper="flex-center text-sm z-50 w-24 h-24 absolute left-[20px] bottom-[-40px]"
                                />

                                {/* article image */}
                                <Image
                                    src={'/images/login-background.avif'}
                                    alt="article"
                                    classNameWrapper="absolute top-0 w-full h-full"
                                />
                            </div>
                            <div className=" mt-14 rounded-sm bg-white">
                                <div className="flex justify-between">
                                    <h3 className="mb-2 font-bold text-black">
                                        Hoang Nguyen
                                    </h3>
                                    <h5 className="text-blue-500">
                                        39 luot yeu thich
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
                                            <div
                                                className={` rounded-sm border-t-2 border-b-2 bg-white p-4`}
                                            >
                                                <div className="flex ">
                                                    <Image
                                                        src={
                                                            'images/avatar-fallback.png'
                                                        }
                                                        alt="article"
                                                        classNameWrapper="flex-shrink-0 w-[150px] h-[150px] object-cover rounded-lg"
                                                    />

                                                    <div className="relative ml-4 w-full ">
                                                        <h2 className="font-bold uppercase">
                                                            Shop bán đồ uy tín
                                                            số 1 Việt Bam
                                                        </h2>
                                                        <p className="mt-2 text-primary-500">
                                                            5.000.000 vnd
                                                        </p>
                                                        <div className="absolute bottom-0 left-0 flex">
                                                            <p>Share</p>
                                                        </div>
                                                    </div>
                                                </div>
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
