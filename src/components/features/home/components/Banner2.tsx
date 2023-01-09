import { Button, SwiperEffectCard } from '@/components/shared';
import { BANNER_IMAGE_LIST } from '@/constants';

const Banner2 = () => {
    return (
        <div className="section-reverse bg-white dark:bg-primaryDark min-h-screen">
            <div className="flex-center flex-1">
                <SwiperEffectCard
                    images={BANNER_IMAGE_LIST}
                    swiperClassName="w-[400px] h-[550px]"
                />
            </div>

            <div className="flex-center flex-1 flex-col mb-28">
                <div>
                    <h2 className="text-[2.6rem] font-[800] mb-2">NAME</h2>
                    <h4>Hãy chia sẽ với hàng xóm của bạn</h4>
                    <h4>Làm cho khu phố của bạn gần gũi và ấm áp</h4>

                    <div className="flex mt-8">
                        <Button
                            className="py-[14px] mr-[16px] font-[500]"
                            primary
                        >
                            Xem các mặt hàng phổ biến
                        </Button>
                        <Button className="bg-black py-[14px] font-[500] text-white hover:bg-gray-800 ">
                            Giao dịch đáng tin cậy
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner2;
