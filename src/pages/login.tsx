import { useMemo } from 'react';

import { LoginForm } from '@/components/features/auth/login';
import { BaseLayout } from '@/components/layouts';
import { randomElement } from '@/utils';
import quotes from '@/quotes.json';
import { useRouter } from 'next/router';

const LoginPage = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const randomQuote = useMemo(() => randomElement(quotes), [quotes]);
    const router = useRouter();
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
            <div className="w-[500px]">
                <p className="text-4xl font-semibold line-clamp-6">
                    &quot;{randomQuote.quote}&quot;
                </p>
                <p className="text-xl italic mt-4 font-semibold">
                    {randomQuote.character}
                </p>
                <p className="font-medium">{randomQuote.anime}</p>
            </div>
            <LoginForm />
            <button onClick={() => router.push('/')}>back</button>
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
