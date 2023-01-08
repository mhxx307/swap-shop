import { Content } from '@/components/features/home';
import { ClientOnly, Head } from '@/components/shared';

const Home = () => {
    return (
        <>
            <Head />
            <ClientOnly>
                <Content />
            </ClientOnly>
        </>
    );
};

export default Home;
