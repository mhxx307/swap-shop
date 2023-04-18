import { ReactNode, useMemo } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';

import { LoginForm } from '@/components/features/auth';
import { BaseLayout } from '@/components/layouts';
import { randomElement } from '@/utils';
import quotes from '@/quotes.json';
import { Head, Rejected } from '@/components/shared';
import { path, REVALIDATE_TIME } from '@/constants';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';

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
    const { isOn } = useTheme();

    return (
        <Rejected>
            <Head />
            <div className="relative grid min-h-screen w-full grid-cols-1 md:grid-cols-5">
                <Link
                    className="absolute right-2 top-0 mt-4 rounded-[15px] border-[1px] border-secondary bg-transparent px-[25px] py-[7px] text-black transition-opacity hover:opacity-80 dark:text-white"
                    href={path.home}
                >
                    {t('back_btn')}
                </Link>
                <div
                    className="relative col-span-2 hidden after:absolute after:inset-0 after:z-10 after:bg-[#000000]/30 md:block"
                    style={{
                        backgroundImage: "url('/images/login-background.avif')",
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                    }}
                >
                    <div className="flex-center relative z-20 h-full w-full flex-col">
                        <div className="w-full px-8">
                            <p className="text-3xl font-semibold italic text-white line-clamp-6">
                                &quot;{randomQuote.text}&quot;
                            </p>
                            <p className="mt-2 text-right text-4xl font-semibold italic text-white">
                                {randomQuote.author}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-center col-span-3">
                    <div className="w-full space-y-6 rounded-lg bg-white p-6 shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md sm:p-8 md:mt-0">
                        <div className="text-2xl font-semibold">
                            {t('welcome_heading')}{' '}
                            <span
                                className="capitalize"
                                style={{
                                    background:
                                        'linear-gradient(-45deg, #e250e5, #4b50e6, #e250e5, #4b50e6)',
                                    backgroundSize: '100% 100%',
                                    backgroundClip: 'text',
                                    marginBottom: 0,
                                    WebkitTextStroke: '3px transparent',
                                    WebkitTextFillColor: isOn
                                        ? '#14141f'
                                        : '#fff',
                                    WebkitBackgroundClip: 'text',
                                }}
                            >
                                second chance
                            </span>
                            <p className="mt-2 text-xl">
                                {t('please_heading')}
                            </p>
                        </div>

                        <LoginForm />

                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center">
                                <p className="mr-2 font-thin text-gray-500 dark:text-white">
                                    {t('dont_have_account')}
                                </p>
                                <Link
                                    href={path.register}
                                    className="font-bold text-black hover:text-gray-500 dark:text-white dark:hover:text-opacity-80"
                                >
                                    {t('sign_up_free')}
                                </Link>
                            </div>

                            <Link
                                href={path.forgotPassword}
                                className="text-blue-500 transition-colors hover:text-blue-400"
                            >
                                {t('forgot_password')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Rejected>
    );
};

// eslint-disable-next-line react/display-name
LoginPage.Layout = (page: ReactNode) => (
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
