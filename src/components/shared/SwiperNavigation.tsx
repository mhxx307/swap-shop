// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper';
import classNames from 'classnames';
import Image from './Image';

export interface SwiperNavigationProps {
    images: string[];
    imageClassName?: string;
    swiperSlideClassName?: string;
    className?: string;
}

const SwiperNavigation = ({
    images,
    imageClassName,
    swiperSlideClassName,
    className,
}: SwiperNavigationProps) => {
    return (
        <>
            <Swiper
                navigation={true}
                spaceBetween={10}
                modules={[Navigation]}
                className={classNames(
                    'overflow-hidden rounded-2xl select-none',
                    className,
                )}
            >
                {images.map((image) => (
                    <SwiperSlide className={swiperSlideClassName} key={image}>
                        <Image
                            src={image}
                            alt="thumb"
                            containerclassname={classNames(
                                'w-full h-full shadow-lg',
                                imageClassName,
                            )}
                            className="rounded-2xl"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default SwiperNavigation;
