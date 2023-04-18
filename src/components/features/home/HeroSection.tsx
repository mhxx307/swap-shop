import { Button } from '@/components/shared';
import { path } from '@/constants';
import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { BiRocket } from 'react-icons/bi';
import { BsFillPenFill } from 'react-icons/bs';

function HeroSection() {
    const { isOn } = useTheme();
    const router = useRouter();
    const { t } = useTranslation('common');

    return (
        <div className="grid grid-cols-12">
            <div className="col-span-6">
                <div>
                    <h2 className="text-4xl">
                        {t('hero_title1')}{' '}
                        <span
                            style={{
                                background:
                                    'linear-gradient(-45deg, #e250e5, #4b50e6, #e250e5, #4b50e6)',
                                backgroundSize: '100% 100%',
                                backgroundClip: 'text',
                                marginBottom: 0,
                                WebkitTextStroke: '3px transparent',
                                WebkitTextFillColor: isOn ? '#14141f' : '#fff',
                                WebkitBackgroundClip: 'text',
                            }}
                        >
                            {t('hero_title2')}
                        </span>{' '}
                        Second Chance
                    </h2>
                    <p>{t('hero_title3')}</p>

                    <div className="mt-[40px] flex items-center gap-4">
                        <Button
                            secondary
                            LeftIcon={BiRocket}
                            className="flex items-center gap-2 rounded-[50px] border-[1px]  border-none py-[7px] px-[25px] text-sm text-white"
                            onClick={() => router.push(path.market)}
                        >
                            {t('explore')}
                        </Button>
                        <Button
                            secondary
                            LeftIcon={BsFillPenFill}
                            className="flex items-center gap-2 rounded-[50px] border-[1px]  border-none py-[7px] px-[25px] text-sm text-white"
                            onClick={() => router.push(path.createArticle)}
                        >
                            {t('create')}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="col-span-6">
                <div className="m-auto w-[500px]">
                    <Image
                        src="/images/hero.jpg"
                        alt="Hero"
                        className="w-full rounded-[7px]"
                        width={500}
                        height={500}
                    />
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
