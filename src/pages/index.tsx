import { ClientOnly, Head } from '@/components/shared';
import { useTranslation } from 'next-i18next';

const Home = () => {
    const { t } = useTranslation('header');
    return (
        <>
            <Head
                title="Swap shop - home page"
                description="Trao đổi , chia sẻ với hàng sớm của bạn. Làm cho khu phố thêm gần rũi ấm áp"
            />
            <ClientOnly>
                <h1 className="text-[3rem]">{t('language')}</h1>
            </ClientOnly>
        </>
    );
};

export default Home;
