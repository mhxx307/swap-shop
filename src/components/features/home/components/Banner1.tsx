import { SwiperEffectCard } from '@/components/shared';
import { BANNER_IMAGE_LIST } from '@/constants';

const Banner1 = () => {
    return (
        <div className="section bg-[#FBF7F2] dark:bg-primaryDark min-h-screen">
            <div className="flex-center flex-1 flex-col mb-16">
                <div>
                    <h2 className="text-[2.6rem] font-[800] mb-2">NAME</h2>
                    <h4>Hãy chia sẽ với hàng xóm của bạn</h4>
                    <h4>Làm cho khu phố của bạn gần gũi và ấm áp</h4>
                </div>
            </div>
            <div className="flex-center flex-1">
                <SwiperEffectCard images={BANNER_IMAGE_LIST} />
            </div>
        </div>
    );
};

export default Banner1;
