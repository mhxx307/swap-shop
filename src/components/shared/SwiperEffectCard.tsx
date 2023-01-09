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
    swiperClassName?: string;
    swiperSlideClassName?: string;
    className?: string;
}

const SwiperEffectCard = ({
    images,
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
                className={classNames('overflow-hidden', swiperClassName)}
            >
                {images.map((image, index) => (
                    <SwiperSlide className={swiperSlideClassName} key={index}>
                        <Image
                            src={image}
                            alt="Banner"
                            containerClassName={classNames(
                                'w-full h-full rounded-lg shadow-lg',
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
