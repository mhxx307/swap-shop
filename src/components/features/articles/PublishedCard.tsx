import { Image } from '@/components/shared';
import { STATUS_ARTICLE } from '@/constants';
import { Article } from '@/generated/graphql';
import DOMPurify from 'dompurify';
import { useRouter } from 'next/router';
import React from 'react';

function PublishedCard({ article }: { article: Article }) {
    const router = useRouter();
    return (
        <div
            key={article.id}
            className={`mt-1 mb-4 block rounded-md border-[1px] bg-white p-4 dark:bg-[#343444]`}
        >
            <div className="flex ">
                <Image
                    src={article.images[0]}
                    alt="article"
                    classnamewrapper="flex-shrink-0 w-[150px] h-[150px] object-cover rounded-lg"
                />

                <div className="relative ml-4 w-full ">
                    <h2 className="font-bold uppercase">{article.title}</h2>
                    <p className="mt-2 text-primary-500">
                        {article.price && article.price === '0'
                            ? 'Free'
                            : article.price}
                    </p>
                    <div className="absolute bottom-0 left-0 flex w-full justify-between">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(article.description),
                            }}
                        />
                        {article.status === STATUS_ARTICLE.APPROVED && (
                            <button
                                onClick={() =>
                                    router.push(`/articles/edit/${article.id}`)
                                }
                                className="cursor-pointer items-center rounded-md bg-blue-700 p-[10px] px-3 py-1.5 text-white transition-colors hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PublishedCard;
