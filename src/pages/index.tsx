import { Banner1, Banner2 } from '@/components/features/home';
import { ClientOnly, Head } from '@/components/shared';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { ArticlesSwiperInfinite } from '@/components/features/articles';

interface HomeProps {
    articles: any;
}

const Home = ({ articles }: HomeProps) => {
    return (
        <>
            <Head />
            <ClientOnly>
                <div className="section bg-[#FBF7F2] min-h-screen bg-[url('/images/bg-together.jpg')] object-cover bg-cover bg-center"></div>
                <Banner1 />
                <Banner2 />
                <div className="wrapper mb-[50px] space-y-6">
                    <h3 className="text-4xl font-bold">Recommended for you</h3>
                    <ArticlesSwiperInfinite articleList={articles} />
                </div>
                <div className="wrapper mb-[50px] space-y-6">
                    <h3 className="text-4xl font-bold">New articles</h3>
                    <ArticlesSwiperInfinite articleList={articles} />
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
