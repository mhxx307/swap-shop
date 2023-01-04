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
        <div className="w-full min-h-screen flex items-center justify-between relative">
            <ButtonLink
                secondary
                className="absolute top-10 left-20 text-white bg-black py-2 pr-6 pl-4"
                LeftIcon={AiOutlineLeft}
                href="/"
            >
                back
            </ButtonLink>
            <div className="h-screen flex-[1] hidden sm:flex flex-col items-center justify-center">
                <div className="max-w-[500px]">
                    <p className="text-4xl font-semibold line-clamp-6">
                        &quot;{randomQuote.quote}&quot;
                    </p>
                    <p className="text-xl italic mt-4 font-semibold">
                        {randomQuote.character}
                    </p>
                    <p className="font-medium">{randomQuote.anime}</p>
                </div>
            </div>

            <div className="h-screen flex-[1] flex flex-col items-center justify-center">
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
