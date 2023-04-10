import { Image } from '@/components/shared';
import { Article } from '@/generated/graphql';
import DOMPurify from 'dompurify';
import { useRouter } from 'next/router';
import React from 'react';

function PublishedCard({ article }: { article: Article }) {
    const router = useRouter();
    return (
        <div key={article.id} className={`mt-1 block rounded-sm bg-white p-4`}>
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
                        <button
                            onClick={() =>
                                router.push(`/articles/edit/${article.id}`)
                            }
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PublishedCard;
