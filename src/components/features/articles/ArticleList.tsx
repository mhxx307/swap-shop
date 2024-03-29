import classNames from 'classnames';
import ArticleCard from './ArticleCard';
import { motion } from 'framer-motion';
import { memo } from 'react';
import { Article } from '@/generated/graphql';
import { useTranslation } from 'react-i18next';

export interface ArticleListProps {
    title?: string;
    titleClassName?: string;
    className?: string;
    articles: Article[];
}

const ArticleList = ({
    title,
    articles,
    titleClassName,
    className,
}: ArticleListProps) => {
    const { t } = useTranslation('common');

    return (
        <div className={classNames('mb-4', className)}>
            {title && (
                <h3
                    className={classNames(
                        'mb-6 text-xl font-bold',
                        titleClassName,
                    )}
                >
                    {title}
                </h3>
            )}

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                {articles && articles.length > 0 ? (
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
                            className="col-span-2"
                        >
                            <ArticleCard article={article} />
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-12 text-center">
                        <p className="text-sm">{t('not_found_article')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(ArticleList);
