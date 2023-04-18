import FavoriteCard from '@/components/features/articles/FavoriteCard';
import { Auth, CommonSection } from '@/components/shared';
import { Favorite, useFavoritesQuery } from '@/generated/graphql';
import { useTranslation } from 'react-i18next';

function Favorites() {
    const { data } = useFavoritesQuery();
    const { t } = useTranslation('common');
    return (
        <Auth>
            <div className="flex w-full flex-col">
                <CommonSection title={t('favorite_articles')} />
                <div className="container mt-10">
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
            </div>
        </Auth>
    );
}

export default Favorites;
