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
            <Image
                src={article.thumbnail}
                alt="article"
                containerclassname="w-full h-[300px] rounded-md"
            />
            <h3 className="font-bold">{article.title}</h3>
            <p className="text-primary-600 font-bold">{article.price}</p>
            <p className="line-clamp-3 text-[1.4rem]">{article.description}</p>
        </div>
    );
};

export default ArticleCard;
