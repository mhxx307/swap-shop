import { ClientOnly, Head, Map, SwiperNavigation } from '@/components/shared';
import { GetStaticProps, GetStaticPropsContext } from 'next';

export interface ArticleDetailPageProps {
    article: any;
}

const ArticleDetailPage = ({ article }: ArticleDetailPageProps) => {
    return (
        <>
            <Head title={article.title} description={article.description} />
            <ClientOnly>
                <div className="mt-[100px] flex-center">
                    <div className="w-[500px] min-h-[400px] space-y-20">
                        <SwiperNavigation
                            images={article.images}
                            className="w-full h-[400px]"
                        />

                        <div className="flex justify-between">
                            <p>User name</p>
                            <p>Attitude</p>
                        </div>

                        <div className="border-bottom" />

                        <div>
                            <h3>{article.title}</h3>
                            <p>{article.category} - 17h</p>
                            <p>{article.description}</p>
                        </div>

                        <div className="border-bottom" />

                        <Map />

                        <div>san pham lien quan</div>
                    </div>
                </div>
            </ClientOnly>
        </>
    );
};

// https://stackoverflow.com/questions/70596939/how-to-generate-dynamic-paths-for-non-default-locales-in-next-js
export const getStaticPaths = async ({ locales }: { locales: string[] }) => {
    const response = await fetch('https://dummyjson.com/products?limit=10');
    const data = await response.json();

    return {
        paths: data.products
            .map((item: any) => {
                return locales.map((locale) => {
                    return {
                        params: { articleId: item.id.toString() },
                        locale,
                    };
                });
            })
            .flat(),
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps<ArticleDetailPageProps> = async (
    context: GetStaticPropsContext,
) => {
    const id = context.params?.articleId;
    if (!id) return { notFound: true };

    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();

    console.log(data);

    return {
        props: {
            article: data,
        },
        revalidate: 10,
    };
};

export default ArticleDetailPage;
