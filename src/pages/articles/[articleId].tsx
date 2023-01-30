import { ArticlesSwiperInfinite } from '@/components/features/articles';
import {
    Button,
    ClientOnly,
    Head,
    Image,
    SwiperNavigation,
    TabView,
} from '@/components/shared';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { BsFillStarFill, BsFillTelephoneFill } from 'react-icons/bs';
import { FaFacebookF, FaLink, FaTwitter } from 'react-icons/fa';
import { MdReportProblem } from 'react-icons/md';

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
                                className="w-full h-[500px] shadow-3xl"
                            />
                        </div>

                        <div className="col-span-10 md:col-span-6 space-y-20">
                            <p className="text-6xl line-clamp-2 break-words">
                                {article.title}
                            </p>

                            <div className="flex justify-between">
                                <p className="text-4xl text-primary-400 ">
                                    {article.price} $
                                </p>
                                <Button
                                    LeftIcon={MdReportProblem}
                                    className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-xl px-[20px] py-[10px] text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                >
                                    Tố cáo
                                </Button>
                            </div>

                            <div className="border-bottom" />

                            <p>Category: {article.category}</p>

                            <Button
                                className="py-[10px] px-[20px] text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-xl text-center"
                                primary
                                LeftIcon={BsFillTelephoneFill}
                            >
                                Liên hệ
                            </Button>

                            <Button
                                className="py-[10px] px-[20px] text-xl font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                LeftIcon={BsFillStarFill}
                            >
                                Add to wishlist
                            </Button>
                            <div className="flex items-center space-x-6">
                                <span>Share</span>
                                <FaFacebookF />
                                <FaTwitter />
                                <FaLink />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center border-gray-400 border px-[20px] py-[20px] rounded-xl">
                        <div className="flex justify-between items-center space-x-4">
                            <div className="relative">
                                <Image
                                    src="https://www.adobe.com/express/feature/image/media_16ad2258cac6171d66942b13b8cd4839f0b6be6f3.png?width=750&format=png&optimize=medium"
                                    alt="dog avatar"
                                    className="w-[40px] h-[40px] rounded-full sm:cursor-pointer"
                                />
                                <span className="bottom-0 left-[28px] absolute w-[14px] h-[14px] bg-green-400 border-[2px] border-white dark:border-gray-800 rounded-full"></span>
                            </div>
                            <p>Minh Quan</p>
                        </div>
                    </div>

                    <TabView
                        tabs={[
                            {
                                label: 'Description',
                                content: article.description,
                            },
                            { label: 'Comments', content: <div>Hello</div> },
                            {
                                label: 'MinhQuan articles',
                                content: <div>Article</div>,
                            },
                        ]}
                    />

                    <div className="mb-[50px] space-y-6">
                        <h3 className="text-4xl font-bold">Relate articles</h3>
                        <ArticlesSwiperInfinite articleList={[]} />
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
