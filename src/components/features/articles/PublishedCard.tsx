import { Image } from '@/components/shared';
import { STATUS_ARTICLE, path } from '@/constants';
import { Article, useClosedArticleMutation } from '@/generated/graphql';
import { generateNameId } from '@/utils';
import DOMPurify from 'dompurify';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';

function PublishedCard({
    article,
    refetch,
}: {
    article: Article;
    refetch?: any;
}) {
    const router = useRouter();

    const [closedArticle] = useClosedArticleMutation();

    const handleClosedArticle = async () => {
        const answer = window.confirm(
            'Bạn có thật sự muốn đóng bài viết. Nếu đóng thì sẽ không đươc thao tác lại',
        );
        if (answer) {
            await closedArticle({
                variables: { articleId: article.id },
                onCompleted: () => toast.success('Closed article successfully'),
            });
            refetch();
        } else {
            return;
        }
    };

    const handleArticleDetail = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        e.preventDefault();
        if (article.status === STATUS_ARTICLE.APPROVED) {
            router.push(
                `${path.market}/${generateNameId({
                    id: article.id,
                    name: article.title,
                })}`,
            );
        }
    };
    return (
        <button
            key={article.id}
            className={`relative mt-1 mb-4 w-full rounded-md border-[1px] bg-white p-4 dark:bg-[#343444]`}
            onClick={handleArticleDetail}
        >
            <div className="flex">
                <Image
                    src={article.images[0]}
                    alt="article"
                    classnamewrapper="flex-shrink-0 w-[150px] h-[150px] object-cover rounded-lg"
                />

                <div className="ml-4 flex-col">
                    <div className="flex flex-col items-start">
                        <h2 className="font-bold uppercase">{article.title}</h2>
                        <p className="mt-2 text-primary-500">
                            {article.price && article.price === '0'
                                ? 'Free'
                                : article.price}
                        </p>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(article.description),
                            }}
                            className="line-clamp-3"
                        />
                    </div>
                    <div className="absolute bottom-3 right-3 flex justify-between">
                        {article.status === STATUS_ARTICLE.APPROVED &&
                            article.isClosed === false && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        router.push(
                                            `/articles/edit/${article.id}`,
                                        );
                                    }}
                                    className="cursor-pointer items-center rounded-md bg-blue-700 p-[10px] px-3 py-1.5 text-white transition-colors hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Edit
                                </button>
                            )}

                        {article.isClosed === false && (
                            <button
                                onClick={handleClosedArticle}
                                className="ml-2 cursor-pointer items-center rounded-md bg-blue-700 p-[10px] px-3 py-1.5 text-white transition-colors hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Close
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </button>
    );
}

export default PublishedCard;
