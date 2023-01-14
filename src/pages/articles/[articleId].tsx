import {
    Button,
    ClientOnly,
    Head,
    Image,
    SwiperNavigation,
} from '@/components/shared';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { GrStatusGoodSmall } from 'react-icons/gr';

export interface ArticleDetailPageProps {
    article: any;
}

const ArticleDetailPage = ({ article }: ArticleDetailPageProps) => {
    return (
        <>
            <Head title={article.title} description={article.description} />
            <ClientOnly>
                <div className="mt-[100px] wrapper space-y-20">
                    <div className="grid grid-cols-10 space-y-20 md:space-y-0 md:space-x-20">
                        <div className="col-span-10 md:col-span-4">
                            <SwiperNavigation
                                images={article.images}
                                className="w-full h-[500px]"
                                imageClassName="border-black border-[1px]"
                            />
                        </div>

                        <div className="col-span-10 md:col-span-6 space-y-20">
                            <p className="text-6xl line-clamp-2 break-words">
                                {article.title}
                            </p>
                            <div className="flex justify-between">
                                <p className="text-4xl text-primary-400 ">
                                    {article.price}
                                </p>
                                <p className="hover:cursor-pointer">Tố cáo</p>
                            </div>

                            <div className="border-bottom" />

                            <div>
                                <p>{article.category} - 17h</p>
                                <p>{article.description}</p>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    className="py-[14px] font-[500] px-[30px] "
                                    primary
                                >
                                    Liên hệ
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center border-gray-400 border px-[20px] py-[20px] rounded-xl">
                        <div className="flex justify-between items-center">
                            <Image
                                src="https://www.adobe.com/express/feature/image/media_16ad2258cac6171d66942b13b8cd4839f0b6be6f3.png?width=750&format=png&optimize=medium"
                                alt="dog avatar"
                                className="rounded-[50%] w-[70px] h-[70px] object-cover mr-[12px] sm:cursor-pointer"
                            />
                            <div>
                                <p>User Name</p>
                                <span className="flex items-center">
                                    <GrStatusGoodSmall className="mr-2 text-green-500" />
                                    online
                                </span>
                            </div>
                        </div>
                        <div>
                            <Button
                                className="py-[14px] font-[500] px-[30px] "
                                primary
                            >
                                Xem bài viết
                            </Button>
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
