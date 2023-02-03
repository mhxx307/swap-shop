import { GetStaticProps, GetStaticPropsContext } from 'next';

import { Banner1, Banner2, HeroSection } from '@/components/features/home';
import { ClientOnly, Head } from '@/components/shared';
import { ArticlesSwiperInfinite } from '@/components/features/articles';

interface HomeProps {
    articles: any;
}

const Home = ({ articles }: HomeProps) => {
    return (
        <>
            <Head />
            <ClientOnly>
                <HeroSection />
                <Banner1 />
                <Banner2 />
                <div className="wrapper mb-[60px] bg-[#FBF7F2] dark:bg-primaryDark py-8">
                    <div className="space-y-3">
                        <h3 className="text-4xl font-extrabold text-primary-500 italic">
                            New articles
                        </h3>
                        <ArticlesSwiperInfinite articleList={articles} />
                    </div>
                </div>
            </ClientOnly>
        </>
    );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async (
    context: GetStaticPropsContext,
) => {
    const response = await fetch('https://dummyjson.com/products?limit=10');
    const data = await response.json();

    return {
        props: {
            articles: data.products,
        },
    };
};
