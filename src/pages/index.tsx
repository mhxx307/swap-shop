import { ClientOnly, Head } from '@/components/shared';

const Home = () => {
    return (
        <>
            <Head />
            <ClientOnly>
                <h1 className="text-[2rem]">content</h1>
            </ClientOnly>
        </>
    );
};

export default Home;
