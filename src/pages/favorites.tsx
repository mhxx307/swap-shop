import { ArticleCard } from '@/components/features/articles';
import { Article, useFavoritesQuery } from '@/generated/graphql';

function Favorites() {
    const { data } = useFavoritesQuery();
    return (
        <div className="container header-height">
            <div className="flex flex-col items-center">
                {data?.favorites &&
                    data?.favorites.map((favorite) => (
                        <div key={favorite.id} className="h-[300px] w-[300px]">
                            {favorite.article.title}
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Favorites;
