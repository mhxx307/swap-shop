import { Button, ButtonLink, TextSpan } from '@/components/shared';
import { useEffect } from 'react';

const HeroSection = () => {
    useEffect(() => {
        const hero = document.querySelector('#hero');

        const mouseTrail = (e: any) => {
            [1, 0.9, 0.8, 0.5, 0.1].forEach(function (i) {
                var j = (1 - i) * 50;
                var elem = document.createElement('div');
                var size = Math.ceil(Math.random() * 10 * i) + 'px';
                elem.style.position = 'fixed';
                elem.style.top =
                    e.pageY + Math.round(Math.random() * j - j / 2) + 'px';
                elem.style.left =
                    e.pageX + Math.round(Math.random() * j - j / 2) + 'px';
                elem.style.width = size;
                elem.style.height = size;
                elem.style.background =
                    'hsla(' +
                    Math.round(Math.random() * 360) +
                    ', ' +
                    '100%, ' +
                    '50%, ' +
                    i +
                    ')';
                elem.style.borderRadius = size;
                elem.style.pointerEvents = 'none';
                if (hero) {
                    hero.appendChild(elem);

                    window.setTimeout(function () {
                        hero.removeChild(elem);
                    }, Math.round(Math.random() * i * 500));
                }
            });
        };

        window.addEventListener('mousemove', mouseTrail, false);

        return () => {
            window.removeEventListener('mousemove', mouseTrail);
        };
    }, []);

    return (
        <section
            className="h-screen flex-center text-center text-white"
            id="hero"
        >
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-no-repeat bg-center bg-cover video-container">
                <video
                    src="https://traversymedia.com/downloads/video.mov"
                    muted
                    loop
                    autoPlay
                    className="min-w-full min-h-full absolute top-[50%] left-[50%] object-cover"
                    style={{ transform: 'translate(-50%, -50%)' }}
                />
            </div>
            <div className="z-[2] space-y-4">
                <TextSpan
                    text="Second Chance"
                    className="uppercase text-5xl tracking-wider font-extrabold"
                />
                <h3>Cơ hội tìm được món hàng ưng ý một cách miễn phí</h3>
                <div className="flex-center space-x-4">
                    <ButtonLink
                        href="/register"
                        outline
                        className="border-white hover:scale-110"
                    >
                        Đăng ký
                    </ButtonLink>
                    <Button primary>Tìm hiểu thêm</Button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
