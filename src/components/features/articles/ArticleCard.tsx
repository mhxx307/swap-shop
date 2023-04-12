import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsFillPlayFill } from 'react-icons/bs';
import TimeAgo from 'timeago-react';

import { Button, Image } from '@/components/shared';
import { Article } from '@/generated/graphql';
import { formatCurrency, generateNameId } from '@/utils';
import { HeartButton } from '.';
import { path } from '@/constants';

interface ArticleCardProps {
    article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
    const router = useRouter();

    return (
        <div className="rounded-[10px] bg-white p-[20px] shadow dark:bg-[#343444]">
            {/* image */}
            <motion.div
                whileHover={{
                    scale: 1.025,
                    transition: {
                        duration: 0.2,
                    },
                }}
                onClick={() =>
                    router.push(
                        `/${path.market}/${generateNameId({
                            id: article.id,
                            name: article.title,
                        })}`,
                    )
                }
                role="button"
                tabIndex={0}
                aria-hidden="true"
                className="relative pt-[calc(95%)]"
            >
                <Image
                    src={article.images[0]}
                    alt="article"
                    classnamewrapper="absolute top-0 w-full h-full"
                    className="rounded-[10px]"
                />
                {article.id && <HeartButton articleId={article.id} />}
            </motion.div>

            <div className="">
                <span className="my-[8px] block text-[10px] font-normal text-[#919eab] line-clamp-1">
                    <TimeAgo datetime={article.createdDate} />{' '}
                    {article.user.address}
                </span>

                <div className="space-y-4">
                    <h5 className="truncate text-sm hover:underline">
                        <Link
                            href={`/${path.market}/${generateNameId({
                                id: article.id,
                                name: article.title,
                            })}`}
                        >
                            {article.title}
                        </Link>
                    </h5>

                    <div className="flex">
                        {/* avatar */}
                        <div className="mr-[18px] h-[40px] w-[40px] flex-shrink-0 cursor-pointer object-cover">
                            <img
                                src={
                                    article.user.avatar ||
                                    '/images/avatar-fallback.png'
                                }
                                alt={article.user.username}
                                className="w-full rounded-full "
                            />
                        </div>

                        {/* content */}
                        <div className="flex w-full items-center justify-between">
                            <div className="space-y-2">
                                <h6 className="text-xs text-[#919eab]">
                                    Created By
                                </h6>
                                <p className="text-xs">
                                    {article.user.username}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h6 className="text-xs text-[#919eab]">
                                    Price
                                </h6>
                                <p className="text-xs">
                                    {article.price && article.price === '0'
                                        ? 'Free'
                                        : `đ ${formatCurrency(
                                              Number(article.price),
                                          )}`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-[18px] flex items-center justify-between">
                    <Button
                        secondary
                        className="rounded-full px-6 text-white"
                        LeftIcon={BsFillPlayFill}
                        onClick={() =>
                            router.push(
                                `/${path.market}/${generateNameId({
                                    id: article.id,
                                    name: article.title,
                                })}`,
                            )
                        }
                    >
                        Xem
                    </Button>
                    <span className="truncate text-xs">address</span>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
