// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation, Autoplay, Pagination } from 'swiper';
import classNames from 'classnames';
import Image from './Image';

export interface SwiperAutoplayProps {
    images: string[];
    imageClassName?: string;
    swiperSlideClassName?: string;
    className?: string;
}

const SwiperAutoplay = ({
    images,
    imageClassName,
    swiperSlideClassName,
    className,
}: SwiperAutoplayProps) => {
    return (
        <>
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                centeredSlides={true}
                loop={true}
                navigation={true}
                spaceBetween={10}
                modules={[Autoplay, Pagination, Navigation]}
                className={classNames('select-none overflow-hidden', className)}
            >
                {images.map((image) => (
                    <SwiperSlide className={swiperSlideClassName} key={image}>
                        <Image
                            src={image}
                            alt="thumb"
                            classnamewrapper={classNames(
                                'w-full h-full shadow-3xl',
                                imageClassName,
                            )}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default SwiperAutoplay;
