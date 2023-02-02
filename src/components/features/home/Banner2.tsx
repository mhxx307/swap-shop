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

        function rotateCube(e: any) {
            const cube: any = document.getElementsByClassName('cube');
            let x = e.clientX - window.innerWidth / 2;
            let y = e.clientY - window.innerHeight / 2;
            const q = 0.15;
            let i;

            x = x * q * 1.25;
            y = -y * q * 1.25;

            for (i = 0; i < cube.length; i++) {
                cube[i].style.transform =
                    'rotateY(' + x + 'deg) rotateX(' + y + 'deg)';
            }
        }

        document.addEventListener('mousemove', rotateCube);

        return () => {
            animation.stop;
            document.removeEventListener('mousemove', rotateCube);
        };
    }, [inView, animation, debouncedStartAnimation]);

    return (
        <div
            ref={ref}
            className="section-reverse dark:bg-primaryDark min-h-screen"
        >
            <div className="flex-center flex-1">
                <div
                    className=" w-[300px] h-[300px] bg-slate-500 cube"
                    style={{
                        transformOrigin: '50% 50% 150px',
                        transformStyle: 'preserve-3d',
                        transition: 'all 5s ease-out',
                    }}
                >
                    <div className="face">1</div>
                    <div className="face">2</div>
                    <div className="face">3</div>
                    <div className="face">4</div>
                    <div className="face">5</div>
                    <div className="face">6</div>
                </div>
            </div>

            <motion.div
                className="flex-center flex-1 flex-col"
                animate={animation}
            >
                <div className="space-y-6">
                    <h2 className="text-7xl font-extrabold text-primary-500">
                        <TextSpan text="Loyalty" />
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
                            Giao dịch đáng tin cậy
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Banner2;
