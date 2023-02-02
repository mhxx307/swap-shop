import { Button, TextSpan } from '@/components/shared';
import { useEffect } from 'react';

const HeroSection = () => {
    useEffect(() => {
        const banner = document.querySelector('#banner');

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
                if (banner) {
                    banner.appendChild(elem);

                    window.setTimeout(function () {
                        banner.removeChild(elem);
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
        <div
            id="banner"
            className="bg-[#FBF7F2] min-h-screen bg-[url('/images/bg-together.jpg')] object-cover bg-cover bg-center relative after:absolute after:inset-0 after:bg-[#000000]/10 dark:after:bg-[#000000]/20 flex-center"
        >
            <div className="z-[1000] space-y-6 text-center">
                <TextSpan
                    text="SECOND CHANCE"
                    className="text-5xl text-white font-extrabold tracking-wider"
                />
                <h3 className="text-2xl text-white font-bold">
                    Cơ hội tìm thấy những món đồ giá trị miễn phí
                </h3>
                <div className="flex-center space-x-4">
                    <Button
                        outline
                        className="border-white text-white hover:bg-white hover:text-black"
                    >
                        Tìm kiếm
                    </Button>
                    <Button primary>Viết bài</Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
