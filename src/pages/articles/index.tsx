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
                <div className="mt-[100px] wrapper space-y-20">
                    <ArticleList articleList={articles} className="mb-[30px]" />
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
