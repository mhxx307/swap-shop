import { Image } from '@/components/shared';
import { path } from '@/constants';
import { Favorite } from '@/generated/graphql';
import useFavorites from '@/hooks/useFavorites';
import { formatCurrency, generateNameId } from '@/utils';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import Link from 'next/link';
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
            className="mb-4 flex rounded-lg shadow-itemCardLight dark:shadow-itemCardDark"
        >
            <Image
                src={favorite.article.thumbnail}
                alt="article"
                classnamewrapper="flex-shrink-0 w-[150px] h-[150px] object-cover"
            />
            <div className="flex flex-1 flex-col justify-between bg-white p-4 dark:bg-[#343444]">
                <div>
                    <Link
                        href={`https://secondchance.vercel.app/${
                            path.market
                        }/${generateNameId({
                            id: favorite.article.id,
                            name: favorite.article.title,
                        })}`}
                    >
                        <h2 className="cursor-pointer font-semibold uppercase text-black hover:underline dark:text-white">
                            {favorite.article.title}
                        </h2>
                    </Link>
                    <p className="mt-2 text-primary-500">
                        {favorite.article.price &&
                        favorite.article.price === '0'
                            ? formatCurrency(Number(favorite.article.price))
                            : 'Free'}
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between">
                        <p className="font-[300] text-gray-400">
                            {favorite.article.user.fullName} -{' '}
                        </p>
                        <TimeAgo
                            className="text-xs font-[300] text-gray-400"
                            datetime={favorite.article.createdDate}
                        />
                        <p className="font-[300] text-gray-400">
                            {favorite.article.user.address}
                        </p>
                    </div>
                    <div className="flex items-center">
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
