import { ArticleList } from '@/components/features/articles';
import { ClientOnly, Head, SwiperAutoPlay } from '@/components/shared';
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
                <div className="mt-[100px] wrapper space-y-20">
                    <SwiperAutoPlay
                        images={BANNER_IMAGE_LIST}
                        className="w-full h-[450px] hidden sm:block"
                        imageClassName="border-black"
                    />

                    <ArticleList
                        title="Tin đăng mới"
                        articleList={articles}
                        titleClassName="mb-[10px]"
                    />

                    <ArticleList
                        title="Tin phổ biến"
                        articleList={articles}
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
