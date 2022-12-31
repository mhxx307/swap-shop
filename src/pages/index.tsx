import { ClientOnly, Head } from '@/components/shared';

const Home = () => {
    return (
        <>
            <Head
                title="Swap shop - home page"
                description="Trao đổi , chia sẻ với hàng sớm của bạn. Làm cho khu phố thêm gần rũi ấm áp"
            />
            <ClientOnly>
                <h1 className="text-[3rem]">Content</h1>
            </ClientOnly>
        </>
    );
};

export default Home;
