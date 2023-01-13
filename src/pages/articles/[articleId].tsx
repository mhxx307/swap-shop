import { ClientOnly, Head, SwiperNavigation } from '@/components/shared';
import { GetStaticProps, GetStaticPropsContext } from 'next';

export interface ArticleDetailPageProps {
    article: any;
}

const ArticleDetailPage = ({ article }: ArticleDetailPageProps) => {
    return (
        <>
            <Head title={article.title} description={article.description} />
            <ClientOnly>
                <div className="mt-[100px] wrapper space-y-20">
                    <div className="grid grid-cols-10 space-y-20 md:space-x-20">
                        <div className="col-span-10 md:col-span-4">
                            <SwiperNavigation
                                images={article.images}
                                className="w-full h-[500px]"
                            />
                        </div>

                        <div className="col-span-10 md:col-span-6 space-y-20">
                            <div className="flex justify-between">
                                <p>User name</p>
                                <p>Attitude</p>
                            </div>

                            <div className="border-bottom" />

                            <div>
                                <h3>{article.title}</h3>
                                <p>{article.price}</p>
                                <p>{article.category} - 17h</p>
                                <p>{article.description}</p>
                            </div>
                        </div>
                    </div>

                    <div>san pham lien quan</div>
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
