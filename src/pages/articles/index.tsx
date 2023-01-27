import { ArticleList } from '@/components/features/articles';
import { ClientOnly, Head, SwiperNavigation } from '@/components/shared';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { BANNER_IMAGE_LIST } from '@/constants';

export interface ArticlesPageProps {
    articles: any[];
}

const Articles = ({ articles }: ArticlesPageProps) => {
    return (
        <>
            <Head />
            <ClientOnly>
                <div className="mt-[100px] wrapper">
                    {/* <ArticlesBanner /> */}
                    {/* search & sort */}
                    <SwiperNavigation
                        images={BANNER_IMAGE_LIST}
                        className="w-full h-[450px] hidden sm:block"
                        imageClassName="border-black border-[1px]"
                    />
                    <h3>Options</h3>
                    <h3>Sort</h3>
                    <h3>Search</h3>
                    <ArticleList
                        title="Tin đăng mới"
                        articleList={articles}
                        className="mt-[20px]"
                        titleClassName="mb-[10px]"
                    />
                    <ArticleList
                        title="Tin phổ biến"
                        articleList={articles}
                        className="mt-[20px]"
                        titleClassName="mb-[10px]"
                    />
                </div>
            </ClientOnly>
        </>
    );
};

export const getStaticProps: GetStaticProps<ArticlesPageProps> = async (
    context: GetStaticPropsContext,
) => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();

    return {
        props: {
            articles: data.products,
        },
    };
};

export default Articles;
