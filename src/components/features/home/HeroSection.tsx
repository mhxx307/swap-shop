import { Button } from '@/components/shared';
import { path } from '@/constants';
import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BiRocket } from 'react-icons/bi';
import { BsFillPenFill } from 'react-icons/bs';

function HeroSection() {
    const { isOn } = useTheme();
    const router = useRouter();

    return (
        <div className="grid grid-cols-12">
            <div className="col-span-6">
                <div>
                    <h2 className="text-4xl">
                        Discover rare digital art and collect{' '}
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
                            sell extraordinary
                        </span>{' '}
                        NFTs
                    </h2>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Deleniti excepturi omnis neque adipisci sequi
                        ullam unde in minus quis quos.
                    </p>

                    <div className="mt-[40px] flex items-center gap-4">
                        <Button
                            secondary
                            LeftIcon={BiRocket}
                            className="flex items-center gap-2 rounded-[50px] border-[1px]  border-none py-[7px] px-[25px] text-sm text-white"
                            onClick={() => router.push(path.market)}
                        >
                            Explore
                        </Button>
                        <Button
                            secondary
                            LeftIcon={BsFillPenFill}
                            className="flex items-center gap-2 rounded-[50px] border-[1px]  border-none py-[7px] px-[25px] text-sm text-white"
                            onClick={() => router.push(path.createArticle)}
                        >
                            Create
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
