// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper';
import classNames from 'classnames';
import { Image } from '@/components/shared';
import { Category } from '@/generated/graphql';
import Link from 'next/link';
import { path } from '@/constants';
import { generateNameId } from '@/utils';

export interface SwiperNavigationProps {
    categories: Category[];
    imageClassName?: string;
    swiperSlideClassName?: string;
    className?: string;
}

const SwiperCategories = ({
    categories,
    imageClassName,
    swiperSlideClassName,
    className,
}: SwiperNavigationProps) => {
    return (
        <Swiper
            slidesPerView={7}
            grid={{ rows: 2, fill: 'row' }}
            navigation={true}
            spaceBetween={10}
            modules={[Navigation]}
            className={classNames('p-2', className)}
        >
            {categories.map((category) => (
                <SwiperSlide className={swiperSlideClassName} key={category.id}>
                    <Link
                        href={{
                            pathname: `${path.categories}/${generateNameId({
                                id: category.id,
                                name: category.name,
                            })}`,
                        }}
                        className="flex flex-col items-center"
                    >
                        <Image
                            src={
                                'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F1000.png&w=256&q=95'
                            }
                            alt="thumb"
                            classNameWrapper={classNames(
                                'w-24 h-24',
                                imageClassName,
                            )}
                            className="rounded-2xl"
                        />
                        {category.name}
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SwiperCategories;
