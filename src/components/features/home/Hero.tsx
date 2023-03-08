import { ButtonLink, TextSpan } from '@/components/shared';

const HeroSection = () => {
    return (
        <section
            className="h-screen flex-center text-center text-white"
        >
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-no-repeat bg-center bg-cover">
                <div
                    className="bg-[url('https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')] min-w-full min-h-full absolute top-[50%] left-[50%] object-cover bg-cover after:absolute after:inset-0 dark:after:bg-[#000000]/30 after:z-10"
                    style={{ transform: 'translate(-50%, -50%)' }}
                />
            </div>

            <div className="z-[2] space-y-4">
                <TextSpan
                    text="Second Chance"
                    className="uppercase text-3xl md:text-5xl tracking-wider font-extrabold"
                />

                <h3>
                    Cơ hội tìm được món hàng ưng ý một cách miễn phí hoặc chia
                    sẻ món đồ của bạn với những người hàng sớm
                </h3>

                <div className="flex-center space-x-4">
                    <ButtonLink
                        href="/register"
                        className="border-white border-[1px] hover:scale-110"
                    >
                        Tìm đồ cũ
                    </ButtonLink>
                    <ButtonLink href="/register" primary>
                        Đăng ký
                    </ButtonLink>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
