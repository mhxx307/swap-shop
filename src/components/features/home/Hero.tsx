import { TextSpan } from '@/components/shared';
import { path } from '@/constants';
import Link from 'next/link';

const HeroSection = () => {
    return (
        <section className="flex-center h-screen text-center text-white">
            <div className="absolute top-0 left-0 h-full w-full overflow-hidden bg-cover bg-center bg-no-repeat">
                <div
                    className="absolute top-[50%] left-[50%] min-h-full min-w-full bg-[url('https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')] bg-cover object-cover after:absolute after:inset-0 after:z-10 dark:after:bg-[#000000]/30"
                    style={{ transform: 'translate(-50%, -50%)' }}
                />
            </div>

            <div className="z-[2] space-y-4">
                <TextSpan
                    text="Second Chance"
                    className="text-3xl font-extrabold uppercase tracking-wider md:text-5xl"
                />

                <h3>
                    Cơ hội tìm được món hàng ưng ý một cách miễn phí hoặc chia
                    sẻ món đồ của bạn với những người hàng sớm
                </h3>

                <div className="flex-center space-x-4">
                    <Link
                        href={path.articles}
                        className="border-[1px] border-white hover:scale-110"
                    >
                        Tìm đồ cũ
                    </Link>
                    <Link href={path.register}>Đăng ký</Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
