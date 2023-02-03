import { useMemo } from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { GetStaticProps } from 'next';
import Link from 'next/link';

import { LoginForm } from '@/components/features/auth';
import { BaseLayout } from '@/components/layouts';
import { randomElement } from '@/utils';
import quotes from '@/quotes.json';
import { Button, ButtonLink, Head } from '@/components/shared';
import { REVALIDATE_TIME } from '@/constants';
import { useTranslation } from 'react-i18next';

interface Quote {
    text: string;
    author: string;
}

interface LoginPageProps {
    quotes: Quote[];
}

const LoginPage = ({ quotes }: LoginPageProps) => {
    const randomQuote = useMemo(() => randomElement(quotes), [quotes]);
    const { t } = useTranslation('login');

    return (
        <>
            <Head />

            <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-5 relative">
                <ButtonLink
                    secondary
                    containerclassname="absolute right-2 top-0 shadow-3xl mt-4"
                    className="py-2 pr-6 pl-4 select-none bg-white dark:bg-white text-white dark:text-black hover:opacity-80 transition-opacity"
                    LeftIcon={AiOutlineLeft}
                    href="/"
                >
                    {t('back_btn')}
                </ButtonLink>
                <div
                    className="hidden md:block relative col-span-2 after:absolute after:inset-0 after:bg-[#000000]/30 after:z-10"
                    style={{
                        backgroundImage: "url('/images/login-background.avif')",
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                    }}
                >
                    <div className="relative flex flex-col justify-center items-center w-full h-full z-20">
                        <div className="w-full px-8">
                            <p className="italic text-3xl text-white font-semibold line-clamp-6">
                                &quot;{randomQuote.text}&quot;
                            </p>
                            <p className="text-4xl italic mt-2 text-white font-semibold text-right">
                                {randomQuote.author}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-span-3 flex items-center justify-center">
                    <div className="w-[400px] space-y-4">
                        <div className="text-2xl font-semibold">
                            {t('welcome_heading')}{' '}
                            <span className="text-primary-500 capitalize">
                                second chance
                            </span>
                            <p className="text-xl mt-2">
                                {t('please_heading')}
                            </p>
                        </div>

                        <LoginForm />

                        <Button
                            outline
                            className="w-full justify-center py-2 pr-6 pl-4 select-none hover:bg-blue-500 hover:text-white"
                            LeftIcon={FcGoogle}
                            iconClassName="w-5 h-5"
                        >
                            {t('google_login')}
                        </Button>

                        <div className="flex items-center">
                            <p className="font-thin text-gray-500 dark:text-white mr-2">
                                {t('dont_have_account')}
                            </p>
                            <Link
                                href="/register"
                                className="text-black dark:text-white font-bold hover:text-gray-500 dark:hover:text-opacity-80"
                            >
                                {t('sign_up_free')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// eslint-disable-next-line react/display-name
LoginPage.Layout = (page: any) => (
    <BaseLayout showFooter={false} showHeader={false}>
        {page}
    </BaseLayout>
);

export const getStaticProps: GetStaticProps = async () => {
    try {
        const response = await fetch('https://type.fit/api/quotes');
        const data = await response.json();

        return {
            props: {
                quotes: data,
            },
            revalidate: REVALIDATE_TIME,
        };
    } catch (err) {
        return {
            props: {
                quotes,
            },
        };
    }
};

export default LoginPage;
