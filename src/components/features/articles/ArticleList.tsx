import classNames from 'classnames';
import ArticleCard from './ArticleCard';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// interface ArticleProps {
// }

export interface ArticleListProps {
    title?: string;
    articleList: any[];
    titleClassName?: string;
    className?: string;
}

const ArticleList = ({
    title,
    articleList,
    titleClassName,
    className,
}: ArticleListProps) => {
    const { ref, inView } = useInView({
        threshold: 0.2,
    });

    return (
        <div className={classNames('space-y-4', className)}>
            {title && (
                <h3
                    className={classNames('text-2xl font-bold', titleClassName)}
                >
                    {title}
                </h3>
            )}

            <div
                ref={ref}
                className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-5"
            >
                {articleList.map((article, index) => (
                    <motion.div
                        key={article.id}
                        initial={{
                            opacity: 0,
                            translateX: index % 2 === 0 ? -50 : 50,
                            translateY: -50,
                        }}
                        animate={
                            inView && {
                                opacity: 1,
                                translateX: 0,
                                translateY: 0,
                            }
                        }
                        transition={{ duration: 0.2, delay: index * 0.2 }}
                    >
                        <ArticleCard article={article} />
                    </motion.div>
                ))}
            </div>

            <div className="text-center">
                <h4 className="text-blue-500 cursor-pointer">Xem thêm</h4>
            </div>
        </div>
    );
};

export default ArticleList;
