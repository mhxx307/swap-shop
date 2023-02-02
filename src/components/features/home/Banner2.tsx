import { Button, SwiperEffectCard, TextSpan } from '@/components/shared';
import { BANNER_IMAGE_LIST } from '@/constants';
import { useDebounce } from '@/hooks';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const Banner2 = () => {
    const { ref, inView } = useInView({
        threshold: 0.2,
    });
    const animation = useAnimation();
    const startAnimation = () => {
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

        if (!inView) {
            animation.start({ x: '100vw' });
        }
    };

    const debouncedStartAnimation = useDebounce(startAnimation, 400);

    useEffect(() => {
        debouncedStartAnimation;

        return () => {
            animation.stop;
        };
    }, [inView, animation, debouncedStartAnimation]);

    return (
        <div
            ref={ref}
            className="section-reverse dark:bg-primaryDark min-h-screen"
        >
            <div className="flex-center flex-1 mt-[100px] md:mt-0">
                <div className="cube-wrapper">
                    <div className="cube">
                        <div className="face bg-[url('/images/youtube.jpg')]"></div>
                        <div className="face bg-[url('/images/discord.jpg')]"></div>
                        <div className="face bg-[url('/images/twitter.jpg')]"></div>
                        <div className="face bg-[url('/images/insta.jpg')]"></div>
                        <div className="face bg-[url('/images/youtube.jpg')]"></div>
                        <div className="face bg-[url('/images/youtube.jpg')]"></div>
                    </div>
                </div>
            </div>

            <motion.div
                className="flex-center flex-1 flex-col"
                animate={animation}
            >
                <div className="space-y-6">
                    <h2 className="text-4xl text-primary-500">
                        <TextSpan text="Second Chance có gì ?" />
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
            </motion.div>
        </div>
    );
};

export default Banner2;
