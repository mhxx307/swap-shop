import { SwiperEffectCard } from '@/components/shared';
import { BANNER_IMAGE_LIST } from '@/constants';

const Banner1 = () => {
    return (
        <div className="section bg-[#FBF7F2] dark:bg-primaryDark min-h-screen">
            <div className="flex-center flex-1 flex-col mb-8">
                <div className="space-y-6">
                    <h3 className="text-4xl text-primary-500">
                        Tìm kiếm dễ dàng
                    </h3>
                    <div>
                        <h4>Hãy chia sẽ với hàng xóm của bạn</h4>
                        <h4>Làm cho khu phố của bạn gần gũi và ấm áp</h4>
                    </div>
                </div>
            </div>
            <div className="flex-center flex-1">
                <SwiperEffectCard
                    images={BANNER_IMAGE_LIST}
                    swiperClassName="w-[400px] h-[550px]"
                />
            </div>
        </div>
    );
};

export default Banner1;
