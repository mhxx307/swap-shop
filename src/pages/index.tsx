import { Content } from '@/components/features/home';
import { ClientOnly, Head } from '@/components/shared';

const Home = () => {
    return (
        <>
            <Head
                title="Swap shop - home page"
                description="Trao đổi , chia sẻ với hàng sớm của bạn. Làm cho khu phố thêm gần rũi ấm áp"
            />
            <ClientOnly>
                <Content />
            </ClientOnly>
        </>
    );
};

export default Home;
