import { Button, SwiperEffectCard } from '@/components/shared';
import { BANNER_IMAGE_LIST } from '@/constants';

const Banner2 = () => {
    return (
        <div className="section-reverse bg-[#e6f3e6] dark:bg-secondaryDark min-h-screen">
            <div className="flex-center flex-1 mt-[100px] md:mt-0">
                <SwiperEffectCard
                    images={BANNER_IMAGE_LIST}
                    swiperClassName="w-[400px] h-[550px]"
                />
            </div>

            <div className="flex-center flex-1 flex-col">
                <div className="space-y-6">
                    <h2 className="text-4xl text-primary-500">
                        Second Chance có gì ?
                    </h2>

                    <div>
                        <h4>Hãy chia sẽ với hàng xóm của bạn</h4>
                        <h4>Làm cho khu phố của bạn gần gũi và ấm áp</h4>
                    </div>

                    <div className="flex">
                        <Button
                            className="py-[14px] mr-[16px] font-medium"
                            primary
                        >
                            Xem các mặt hàng phổ biến
                        </Button>
                        <Button className="bg-black py-[14px] font-medium text-white hover:bg-gray-800 ">
                            Hướng dẫn
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner2;
