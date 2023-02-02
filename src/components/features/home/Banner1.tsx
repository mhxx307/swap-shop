import { SwiperEffectCard, TextSpan } from '@/components/shared';
import { BANNER_IMAGE_LIST } from '@/constants';
import { useDebounce } from '@/hooks';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const Banner1 = () => {
    const { ref, inView } = useInView({
        threshold: 0.2,
    });
    const animation = useAnimation();

    useEffect(() => {
        if (inView) {
            animation.start({
                x: 0,
                transition: {
                    type: 'spring',
                    duration: 1,
                    bounce: 0.1,
                },
            });
        }

        return () => {
            animation.stop;
        };
    }, [inView, animation]);

    return (
        <div
            ref={ref}
            className="section bg-[#FBF7F2] dark:bg-primaryDark min-h-screen"
        >
            <motion.div
                animate={animation}
                initial={{ x: '-100vw' }}
                className="flex-center flex-1 flex-col mb-8"
            >
                <div className="space-y-6">
                    <h3 className="text-4xl text-primary-500">
                        Tìm kiếm dễ dàng
                    </h3>
                    <div>
                        <h4>Hãy chia sẽ với hàng xóm của bạn</h4>
                        <h4>Làm cho khu phố của bạn gần gũi và ấm áp</h4>
                    </div>
                </div>
            </motion.div>
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
