import { Banner1, Banner2, HeroSection } from '@/components/features/home';
import { ClientOnly, Head } from '@/components/shared';

const Home = () => {
    return (
        <>
            <Head />
            <ClientOnly>
                <HeroSection />
                <Banner1 />
                <Banner2 />
                <div className="container header-height bg-[#FBF7F2] dark:bg-primaryDark">
                    <div className="space-y-3">
                        <h3 className="text-4xl font-extrabold italic text-primary-500">
                            New articles
                        </h3>
                    </div>
                </div>
            </ClientOnly>
        </>
    );
};

export default Home;
