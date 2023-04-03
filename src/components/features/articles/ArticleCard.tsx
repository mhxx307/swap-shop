import { Image } from '@/components/shared';
import { Article } from '@/generated/graphql';
import useFavorites from '@/hooks/useFavorites';
import { generateNameId } from '@/utils';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import TimeAgo from 'timeago-react';
interface ArticleCardProps {
    article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
    const router = useRouter();
    const { handleAddToFavorite, isFavorite } = useFavorites({
        articleId: article.id,
    });

    return (
        <motion.div
            whileHover={{
                scale: 1.025,
                transition: {
                    duration: 0.2,
                },
            }}
            className="relative z-0 col-span-1 m-[5px] cursor-pointer overflow-hidden bg-white text-[#212b36] shadow-3xl transition-shadow"
            onClick={() =>
                router.push(
                    `/articles/${generateNameId({
                        id: article.id,
                        name: article.title,
                    })}`,
                )
            }
            role="button"
            tabIndex={0}
            aria-hidden="true"
        >
            {/* avatar & image */}
            <div className="relative pt-[calc(75%)]">
                <span
                    className="absolute bottom-[-15px] z-[9] inline-block h-[36px] w-[80px] bg-current text-white"
                    style={{
                        WebkitMask:
                            'url(/images/shape-avatar.svg) center center / contain no-repeat',
                    }}
                />

                {/* user avatar */}
                <Image
                    src={article.user.avatar || '/images/avatar-fallback.png'}
                    alt="Avatar"
                    className="h-full w-full object-cover text-center ss:mx-[24px]"
                    classnamewrapper="flex-center text-sm z-50 w-8 h-8 rounded-[50%] overflow-hidden absolute left-[24px] bottom-[-16px]"
                />

                {/* article image */}
                <Image
                    src={article.thumbnail}
                    alt="article"
                    classnamewrapper="absolute top-0 w-full h-full"
                />

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
            </div>

            <div className="py-6 px-2">
                <div className="space-y-1">
                    <span className="mb-[8px] block text-[10px] font-normal text-[#919eab] line-clamp-1">
                        <TimeAgo datetime={article.createdDate} />{' '}
                        {article.user.address}
                    </span>
                    <h3 className="text-2xl font-extrabold line-clamp-1 md:text-lg">
                        {article.title}
                    </h3>
                    <p className="text-sm font-bold text-red-600">
                        {article.price ? `${article.price} ETH` : 'Free'}
                    </p>
                </div>

                <div className="flex flex-wrap justify-end space-x-2 text-[#919eab]">
                    <span className="text-xs font-normal">TP.HCM</span>
                </div>
            </div>
        </motion.div>
    );
};

export default ArticleCard;
