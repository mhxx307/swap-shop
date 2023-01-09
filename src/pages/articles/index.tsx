import { ArticleList } from '@/components/features/articles';
import { ClientOnly, Head } from '@/components/shared';
import { GetStaticProps, GetStaticPropsContext } from 'next';

export interface ArticlesPageProps {
    articles: any[];
}

const Articles = ({ articles }: ArticlesPageProps) => {
    return (
        <>
            <Head />
            <ClientOnly>
                <div className="mt-[80px] wrapper">
                    {/* <ArticlesBanner /> */}
                    {/* search & sort */}
                    <h3>Banner</h3>
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
