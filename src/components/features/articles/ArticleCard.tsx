import { useRouter } from 'next/router';
import { Image } from '@/components/shared';

export interface ArticleCardProps {
    article: any; // sau này là article props
}

const ArticleCard = ({ article }: ArticleCardProps) => {
    const router = useRouter();
    return (
        <div
            className="col-span-1 cursor-pointer"
            onClick={() => router.push(`/articles/${article.id}`)}
        >
            <Image src={article.image} alt="article" className="w-full" />
            <h3>{article.title}</h3>
            <p className="line-clamp-3">{article.description}</p>
        </div>
    );
};

export default ArticleCard;
