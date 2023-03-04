import { GetStaticProps } from 'next';

import { Banner1, Banner2, HeroSection } from '@/components/features/home';
import { ClientOnly, Head } from '@/components/shared';
import { ArticlesSwiperInfinite } from '@/components/features/articles';
import { addApolloState, initializeApollo } from '@/libs/apolloClient';
import { ArticlesDocument, useArticlesQuery } from '@/types/generated/graphql';

const Home = () => {
    return (
        <>
            <Head />
            <ClientOnly>
                <HeroSection />
                <Banner1 />
                <Banner2 />
                <div className="wrapper mb-[60px] bg-[#FBF7F2] dark:bg-primaryDark py-8">
                    <div className="space-y-3">
                        <h3 className="text-4xl font-extrabold text-primary-500 italic">
                            New articles
                        </h3>
                        {/* <ArticlesSwiperInfinite
                            articleList={data?.articles?.paginatedArticles}
                        /> */}
                    </div>
                </div>
            </ClientOnly>
        </>
    );
};

export default Home;
