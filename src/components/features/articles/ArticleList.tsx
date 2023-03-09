import classNames from 'classnames';
import ArticleCard from './ArticleCard';
import { motion } from 'framer-motion';
import { memo } from 'react';
import { Article } from '@/generated/graphql';

export interface ArticleListProps {
    title?: string;
    titleClassName?: string;
    className?: string;
    articles?: Article[];
}

const ArticleList = ({
    title,
    articles,
    titleClassName,
    className,
}: ArticleListProps) => {
    return (
        <div className={classNames('space-y-4', className)}>
            {title && (
                <h3
                    className={classNames('text-2xl font-bold', titleClassName)}
                >
                    {title}
                </h3>
            )}

            <div className="grid grid-cols-2 gap-5 md:grid-cols-4 xl:grid-cols-6">
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
                        >
                            <ArticleCard article={article} />
                        </motion.div>
                    ))}
            </div>
        </div>
    );
};

export default memo(ArticleList);
