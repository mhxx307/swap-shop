import { useRouter } from 'next/router';
import { Image } from '@/components/shared';
import { BsFillChatDotsFill, BsFillEyeFill, BsShareFill } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { Article } from '@/generated/graphql';
import TimeAgo from 'timeago-react';

export interface ArticleCardProps {
    article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
    const router = useRouter();

    return (
        <motion.div
            whileHover={{
                scale: 1.025,
                transition: {
                    duration: 0.2,
                },
            }}
            whileTap={{
                scale: 0.95,
            }}
            className="relative z-0 col-span-1 m-[5px] cursor-pointer overflow-hidden rounded-[12px] bg-white text-[#212b36] shadow-3xl transition-shadow"
            onClick={() => router.push(`/articles/${article.id}`)}
        >
            {/* avatar & image */}
            <div className="relative pt-[calc(75%)]">
                <span
                    className="absolute bottom-[-15px] z-[9] inline-block h-[36px] w-[80px] bg-current text-white"
                    style={{
                        WebkitMask:
                            'url(/images/shape-avatar.svg) center center / contain no-repeat',
                    }}
                ></span>

                {/* user avatar */}
                <Image
                    src={article.user.avatar || '/images/avatar-fallback.png'}
                    alt="Avatar"
                    className="h-full w-full object-cover text-center ss:mx-[24px]"
                    containerClassName="flex-center text-sm z-50 w-8 h-8 rounded-[50%] overflow-hidden absolute left-[24px] bottom-[-16px]"
                />

                {/* article image */}
                <Image
                    src={'/images/avatar-fallback.png'}
                    alt="article"
                    containerClassName="absolute top-0 w-full h-full"
                />
            </div>

            <div className="space-y-6 py-[20px] px-[12px] md:py-[28px] md:px-[20px]">
                <div className="space-y-1">
                    <span className="mb-[8px] block text-[10px] font-normal text-[#919eab] line-clamp-1">
                        <TimeAgo datetime={article.createdDate} />{' '}
                        {article.user.address}
                    </span>
                    <h3 className="text-2xl font-extrabold line-clamp-1 md:text-lg">
                        {article.title}
                    </h3>
                    <p className="text-sm font-bold text-red-600">
                        {/* {article.price} $ */}
                    </p>
                </div>

                <div className="flex flex-wrap justify-end space-x-2 text-[#919eab]">
                    <div className="flex items-center space-x-1">
                        <BsFillChatDotsFill className="h-3 w-3" />
                        <span className="text-[10px] font-[400]">30.10k</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <BsFillEyeFill className="h-3 w-3" />
                        <span className="text-[10px] font-[400]">37.81k</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <BsShareFill className="h-3 w-3" />
                        <span className="text-[10px] font-[400]">1.66k</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ArticleCard;
