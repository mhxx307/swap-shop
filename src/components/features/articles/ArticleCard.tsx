import { useRouter } from 'next/router';
import { Image } from '@/components/shared';
import { BsFillChatDotsFill, BsFillEyeFill, BsShareFill } from 'react-icons/bs';

export interface ArticleCardProps {
    article: any; // sau này là article props
}

const ArticleCard = ({ article }: ArticleCardProps) => {
    const router = useRouter();
    return (
        <div
            className="col-span-1 cursor-pointer relative bg-white shadow-3xl transition-shadow text-[#212b36] rounded-[12px] z-0 overflow-hidden"
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
                    src=""
                    alt="Avatar"
                    className="w-full h-full object-cover ss:mx-[24px] text-center"
                    containerclassname="flex-center text-[1.25rem] z-50 w-[32px] h-[32px] rounded-[50%] overflow-hidden absolute left-[24px] bottom-[-16px]"
                />

                {/* article image */}
                <Image
                    src={article.thumbnail}
                    alt="article"
                    containerclassname="absolute top-[0px] w-full h-full"
                />
            </div>

            <div className="py-[20px] px-[12px] md:py-[28px] md:px-[20px] space-y-6">
                <div className="space-y-2">
                    <span className="mb-[8px] font-[400] text-[#919eab] text-responsive-sx block">
                        07 Apr 2022
                    </span>
                    <h3 className="text-responsive-xl font-[600] line-clamp-1">
                        {article.title}
                    </h3>
                    <p className="text-responsive-xl text-red-600 font-[600]">
                        {article.price} $
                    </p>
                </div>

                <div className="flex flex-wrap justify-end text-[#919eab] space-x-4">
                    <div className="flex items-center space-x-2">
                        <BsFillChatDotsFill className="w-[12px] h-[12px]" />
                        <span className="m-0 text-responsive-sx font-[400]">
                            30.20k
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <BsFillEyeFill className="w-[12px] h-[12px]" />
                        <span className="m-0 text-responsive-sx font-[400]">
                            37.81k
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <BsShareFill className="w-[12px] h-[12px]" />
                        <span className="m-0 text-responsive-sx font-[400]">
                            1.66k
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
