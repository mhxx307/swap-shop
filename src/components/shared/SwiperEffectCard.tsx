import classNames from 'classnames';
import { Image } from '@/components/shared';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards } from 'swiper';

export interface SwiperEffectCardProps {
    images: string[];
    width?: number;
    height?: number;
    swiperClassName?: string;
    swiperSlideClassName?: string;
    className?: string;
}

const SwiperEffectCard = ({
    images,
    width,
    height,
    swiperClassName,
    swiperSlideClassName,
    className,
}: SwiperEffectCardProps) => {
    return (
        <>
            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className={classNames('w-[400px] h-[550px]', swiperClassName)}
            >
                {images.map((image, index) => (
                    <SwiperSlide className={swiperSlideClassName} key={index}>
                        <Image
                            src={image}
                            alt="test"
                            width={width || 400}
                            height={height || 550}
                            className={classNames(
                                'w-[400px] h-[550px] rounded-lg shadow-lg',
                                className,
                            )}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default SwiperEffectCard;
