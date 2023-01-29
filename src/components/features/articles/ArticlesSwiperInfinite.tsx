// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Navigation } from 'swiper';
import ArticleCard from './ArticleCard';

interface ArticlesSwiperInfiniteProps {
    articleList: any;
}

const ArticlesSwiperInfinite = ({
    articleList,
}: ArticlesSwiperInfiniteProps) => {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                }}
                slidesPerGroup={3}
                loop={false}
                loopFillGroupWithBlank={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
            >
                {articleList.map((article: any) => (
                    <SwiperSlide key={article.id}>
                        <ArticleCard article={article} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default ArticlesSwiperInfinite;
