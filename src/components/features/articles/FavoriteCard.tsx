import { Image } from '@/components/shared';
import { Favorite } from '@/generated/graphql';
import useFavorites from '@/hooks/useFavorites';
import { formatCurrency } from '@/utils';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { AiFillHeart } from 'react-icons/ai';
import TimeAgo from 'timeago-react';

interface FavoriteCardProps {
    favorite: Favorite;
    index: number;
}

function FavoriteCard({ favorite, index }: FavoriteCardProps) {
    const { handleAddToFavorite, isFavorite } = useFavorites({
        articleId: favorite.article.id,
    });
    return (
        <motion.div
            key={favorite.id}
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
            transition={{
                duration: 0.2,
                delay: index * 0.2,
            }}
            className="mb-2 flex"
        >
            <Image
                src={favorite.article.thumbnail}
                alt="article"
                classnamewrapper="flex-shrink-0 w-[150px] h-[150px] object-cover"
            />
            <div className="flex flex-1 flex-col justify-between bg-white p-4">
                <div>
                    <h2 className="font-semibold uppercase text-black">
                        {favorite.article.title}
                    </h2>
                    <p className="mt-2 text-primary-500">
                        {favorite.article.price
                            ? formatCurrency(favorite.article.price)
                            : 'Free'}
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between">
                        {/* <Avatar
                    className="h-4 w-4"
                    src={
                        favorite.article.user
                            .avatar as string
                    }
                /> */}
                        <p className="font-[300] text-gray-400">
                            {favorite.article.user.fullName}-
                        </p>
                        <TimeAgo
                            className="font-[300] text-gray-400"
                            datetime={favorite.article.createdDate}
                        />
                        {'-'}
                        <p className="font-[300] text-gray-400">
                            {favorite.article.user.address}
                        </p>
                    </div>
                    <div className=" flex items-center">
                        <h5 className="cursor-pointer rounded-lg border border-red-500 pl-6 pr-6 text-primary-500 hover:bg-slate-50">
                            Chat
                        </h5>

                        <button onClick={handleAddToFavorite}>
                            <AiFillHeart
                                className={classNames(' ml-4 h-8 w-8', {
                                    'fill-primary-500': isFavorite,
                                    'fill-white/70': !isFavorite,
                                })}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default FavoriteCard;
