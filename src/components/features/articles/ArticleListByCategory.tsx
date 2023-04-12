import { motion } from 'framer-motion';
import { memo } from 'react';
import { Article, QueryConfig } from '@/generated/graphql';
import { Image, Pagination } from '@/components/shared';
import { formatCurrency, generateNameId } from '@/utils';
import { useRouter } from 'next/router';
import HearButton from './HeartButton';
import { path } from '@/constants';

export interface ArticleListProps {
    className?: string;
    articles: Article[];
    pageSize: number;
    queryConfig: QueryConfig;
}

const ArticleListByCategory = ({
    articles,
    className,
    pageSize,
    queryConfig,
}: ArticleListProps) => {
    const router = useRouter();

    return (
        <div className={className}>
            <div className="flex flex-col">
                {articles &&
                    articles.map((article) => (
                        <motion.div
                            key={article.id}
                            whileHover={{
                                scale: 1.025,
                                transition: {
                                    duration: 0.2,
                                },
                            }}
                            onClick={() =>
                                router.push(
                                    `/${path.market}/${generateNameId({
                                        id: article.id,
                                        name: article.title,
                                    })}`,
                                )
                            }
                            className="mb-4 flex"
                        >
                            <Image
                                src={article.thumbnail}
                                alt="article"
                                classnamewrapper="flex-shrink-0 w-[150px] h-[150px] object-cover"
                            />
                            <div className="flex flex-1 flex-col justify-between bg-white p-4 dark:bg-[#343434]">
                                <div>
                                    <h3>{article.title}</h3>
                                    <p className="text-sm text-red-500">
                                        {article.price && article.price === '0'
                                            ? `${formatCurrency(
                                                  Number(article.price),
                                              )} đ`
                                            : 'Free'}
                                    </p>
                                </div>
                                <div className="relative flex items-center">
                                    <div className="mr-4 flex items-center text-xs">
                                        <img
                                            src={
                                                article.user.avatar ||
                                                '/images/avatar-fallback.png'
                                            }
                                            alt="avatar"
                                            className="mr-2 h-8 w-8 rounded-full object-cover"
                                        />
                                        <p>{article.user.fullName}</p>
                                    </div>
                                    <p className="text-xs">
                                        {article.createdDate}
                                    </p>

                                    <HearButton articleId={article.id} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
            </div>
            <Pagination
                pageSize={pageSize}
                queryConfig={queryConfig as QueryConfig}
            />
        </div>
    );
};

export default memo(ArticleListByCategory);
