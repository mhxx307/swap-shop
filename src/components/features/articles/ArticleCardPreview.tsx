import { Button } from '@/components/shared';
import { User } from '@/generated/graphql';
import { formatCurrency } from '@/utils';
import { Control, useWatch } from 'react-hook-form';
import { BsFillPlayFill } from 'react-icons/bs';

const ArticleCardPreview = ({
    control,
    thumbnail,
    user,
}: {
    control: Control<any>;
    thumbnail: string;
    user: User;
}) => {
    const title = useWatch({ control, name: 'title' });
    const price = useWatch({ control, name: 'price' });
    return (
        <div className="rounded-[10px] bg-white p-[20px] shadow dark:bg-[#343444]">
            {/* image */}
            <div className="relative pt-[calc(95%)]">
                <img
                    src={thumbnail}
                    alt="article"
                    className="absolute top-0 h-full w-full rounded-[10px]"
                />
            </div>

            <div className="">
                <span className="my-[8px] block text-[10px] font-normal text-[#919eab] line-clamp-1">
                    {user.address}
                </span>

                <div className="space-y-4">
                    <h5 className="truncate text-sm hover:underline">
                        {title}
                    </h5>

                    <div className="flex">
                        {/* avatar */}
                        <div className="mr-[18px] h-[40px] w-[40px] flex-shrink-0 cursor-pointer object-cover">
                            <img
                                src={
                                    user.avatar || '/images/avatar-fallback.png'
                                }
                                alt={user.username}
                                className="h-full w-full rounded-full object-cover "
                            />
                        </div>

                        {/* content */}
                        <div className="flex w-full items-center justify-between">
                            <div className="space-y-2">
                                <h6 className="text-xs text-[#919eab]">
                                    Created By
                                </h6>
                                <p className="text-xs">{user.username}</p>
                            </div>

                            <div className="space-y-2">
                                <h6 className="text-xs text-[#919eab]">
                                    Price
                                </h6>
                                <p className="text-xs">
                                    {price
                                        ? `đ ${formatCurrency(price)}`
                                        : 'Free'}
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
                    >
                        Xem
                    </Button>
                    <span className="truncate text-xs">address</span>
                </div>
            </div>
        </div>
    );
};

export default ArticleCardPreview;
