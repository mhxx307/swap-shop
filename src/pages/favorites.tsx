import FavoriteCard from '@/components/features/articles/FavoriteCard';
import { Auth } from '@/components/shared';
import { Favorite, useFavoritesQuery } from '@/generated/graphql';

function Favorites() {
    const { data } = useFavoritesQuery();
    return (
        <Auth>
            <div className="container header-height">
                <h3 className="text-xl font-bold">Bài viết yêu thích</h3>
                <div className="mt-2 flex flex-col">
                    {data?.favorites &&
                        data?.favorites.map((favorite, index) => (
                            <FavoriteCard
                                favorite={favorite as Favorite}
                                index={index}
                                key={favorite.id}
                            />
                        ))}
                </div>
            </div>
        </Auth>
    );
}

export default Favorites;
