import classNames from 'classnames';
import ArticleCard from './ArticleCard';

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
    return (
        <div className={classNames(className)}>
            <h3 className={classNames('text-4xl font-bold', titleClassName)}>
                {title}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-10">
                {articleList.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
};

export default ArticleList;
