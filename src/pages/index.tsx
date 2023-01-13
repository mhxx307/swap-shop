import { ArticleList } from '@/components/features/articles';
import { Banner1, Banner2 } from '@/components/features/home';
import { ClientOnly, Head } from '@/components/shared';
import { ArticlesPageProps } from './articles';
import { GetStaticProps, GetStaticPropsContext } from 'next';

const Home = ({ articles }: ArticlesPageProps) => {
    return (
        <>
            <Head />
            <ClientOnly>
                <Banner1 />
                <Banner2 />
                <div className="wrapper mb-[50px]">
                    <ArticleList articleList={articles} />
                </div>
            </ClientOnly>
        </>
    );
};

export default Home;

export const getStaticProps: GetStaticProps<ArticlesPageProps> = async (
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
