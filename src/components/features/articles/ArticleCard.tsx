import { useRouter } from 'next/router';
import { Image } from '@/components/shared';
import { BsFillChatDotsFill, BsFillEyeFill, BsShareFill } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { Article } from '@/types/generated/graphql';

export interface ArticleCardProps {
    article: Article; // sau này là article props
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
            className="col-span-1 cursor-pointer relative bg-white shadow-3xl transition-shadow text-[#212b36] rounded-[12px] z-0 overflow-hidden m-[5px]"
            onClick={() => router.push(`/articles/${article.id}`)}
        >
            {/* avatar & image */}
            <div className="relative pt-[calc(75%)]">
                <span
                    className="text-white w-[80px] h-[36px] inline-block bg-current z-[9] bottom-[-15px] absolute"
                    style={{
                        WebkitMask:
                            'url(/images/shape-avatar.svg) center center / contain no-repeat',
                    }}
                ></span>

                {/* user avatar */}
                <Image
                    src={article.user.avatar || '/images/avatar-fallback.png'}
                    alt="Avatar"
                    className="w-full h-full object-cover ss:mx-[24px] text-center"
                    containerclassname="flex-center text-sm z-50 w-8 h-8 rounded-[50%] overflow-hidden absolute left-[24px] bottom-[-16px]"
                />

                {/* article image */}
                <Image
                    src={'/images/avatar-fallback.png'}
                    alt="article"
                    containerclassname="absolute top-0 w-full h-full"
                />
            </div>

            <div className="py-[20px] px-[12px] md:py-[28px] md:px-[20px] space-y-6">
                <div className="space-y-1">
                    <span className="mb-[8px] font-normal text-[#919eab] text-[10px] block line-clamp-1">
                        {article.createdDate} {article.user.address}
                    </span>
                    <h3 className="text-2xl md:text-lg font-extrabold line-clamp-1">
                        {article.title}
                    </h3>
                    <p className="text-sm text-red-600 font-bold">
                        {/* {article.price} $ */}
                    </p>
                </div>

                <div className="flex flex-wrap justify-end text-[#919eab] space-x-2">
                    <div className="flex items-center space-x-1">
                        <BsFillChatDotsFill className="w-3 h-3" />
                        <span className="text-[10px] font-[400]">30.10k</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <BsFillEyeFill className="w-3 h-3" />
                        <span className="text-[10px] font-[400]">37.81k</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <BsShareFill className="w-3 h-3" />
                        <span className="text-[10px] font-[400]">1.66k</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ArticleCard;
