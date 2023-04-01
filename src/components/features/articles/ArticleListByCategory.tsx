import { motion } from 'framer-motion';
import { memo } from 'react';
import { Article } from '@/generated/graphql';
import { Image } from '@/components/shared';
import { formatCurrency } from '@/utils';

export interface ArticleListProps {
    className?: string;
    articles: Article[];
}

const ArticleListByCategory = ({ articles, className }: ArticleListProps) => {
    return (
        <div className={className}>
            <div className="flex flex-col">
                {articles &&
                    articles.map((article, index) => (
                        <motion.div
                            key={article.id}
                            initial={{
                                opacity: 0,
                                translateX: index % 2 === 0 ? -50 : 50,
                                translateY: -50,
                            }}
                            animate={{
                                opacity: 1,
                                translateX: 0,
                                translateY: 0,
                            }}
                            transition={{ duration: 0.2, delay: index * 0.2 }}
                            className="mb-2 flex"
                        >
                            <Image
                                src={article.thumbnail}
                                alt="article"
                                classnamewrapper="flex-shrink-0 w-[150px] h-[150px] object-cover"
                            />
                            <div className="flex flex-1 flex-col justify-between bg-white p-4">
                                <div>
                                    <h3>{article.title}</h3>
                                    <p>
                                        {article.price
                                            ? formatCurrency(article.price)
                                            : 'Free'}
                                    </p>
                                </div>
                                <div>
                                    <p>share</p>
                                    <p>Save</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
            </div>
        </div>
    );
};

export default memo(ArticleListByCategory);
