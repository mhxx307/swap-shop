import { useMemo } from 'react';

import { LoginForm } from '@/components/features/auth/login';
import { BaseLayout } from '@/components/layouts';
import { randomElement } from '@/utils';
import quotes from '@/quotes.json';
import { ButtonLink } from '@/components/shared';
import { AiOutlineLeft } from 'react-icons/ai';

const LoginPage = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const randomQuote = useMemo(() => randomElement(quotes), [quotes]);

    return (
        <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-5 relative">
            <ButtonLink
                secondary
                containerClassName="absolute top-10 left-20 bg-black"
                className="text-white py-2 pr-6 pl-4"
                LeftIcon={AiOutlineLeft}
                href="/"
            >
                back
            </ButtonLink>
            <div
                className="hidden md:block relative col-span-2 after:absolute after:inset-0 after:bg-[#000000]/80 after:z-10"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1672664648342-dca370c6ebd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60')",
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                }}
            >
                <div className="relative flex flex-col justify-center items-center w-full h-full z-20">
                    <div className="w-full px-8">
                        <p className="italic text-5xl text-white font-semibold line-clamp-6 leading-[40px]">
                            &quot;{randomQuote.quote}&quot;
                        </p>
                        <p className="text-4xl italic mt-4 text-white font-semibold text-right">
                            {randomQuote.character}
                        </p>
                        <p className="text-white font-medium text-right">
                            {randomQuote.anime}
                        </p>
                    </div>
                </div>
            </div>

            <div className="col-span-3 flex items-center justify-center">
                <div className="w-[400px]">
                    <LoginForm />
                    {/* forget pass & login other */}
                </div>
            </div>
        </div>
    );
};

// eslint-disable-next-line react/display-name
LoginPage.Layout = (page: any) => (
    <BaseLayout showFooter={false} showHeader={false}>
        {page}
    </BaseLayout>
);

export default LoginPage;
