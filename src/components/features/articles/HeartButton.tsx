import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useFavorites from '@/hooks/useFavorites';
import classNames from 'classnames';

function HearButton({ articleId }: { articleId: string }) {
    const { handleAddToFavorite, isFavorite } = useFavorites({
        articleId,
    });

    return (
        <>
            <button onClick={handleAddToFavorite}>
                <AiOutlineHeart className="absolute bottom-0 right-0 z-50 h-8 w-8 fill-primary-500" />
            </button>
            <AiFillHeart
                className={classNames(
                    'z-49 absolute bottom-0 right-0 h-8 w-8',
                    {
                        'fill-primary-500': isFavorite,
                        'fill-white/70': !isFavorite,
                    },
                )}
            />
        </>
    );
}

export default HearButton;
