import locales from '@/locales.json';
import Tippy from '@tippyjs/react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { forwardRef, memo, useMemo } from 'react';
import { AiOutlineGlobal } from 'react-icons/ai';

interface LanguageSwitcherProps {
    className?: string;
}

// eslint-disable-next-line react/display-name
const LanguageSwitcher = forwardRef<HTMLDivElement, LanguageSwitcherProps>(
    ({ className }, ref) => {
        const router = useRouter();

        const handleChangeLanguage = (lang: string) => () => {
            if (router.locale === lang) return;

            const { pathname, asPath, query } = router;

            router.replace({ pathname, query }, asPath, {
                locale: lang,
                shallow: true,
            });

            nookies.set(null, 'NEXT_LOCALE', lang, { path: '/' });
        };

        const currentLocale = useMemo(
            () => locales.find(({ locale }) => router.locale === locale),
            [router.locale],
        );

        return (
            <Tippy
                interactive={true}
                render={(attrs) => (
                    <div className="shadow-md">
                        {locales.map(({ locale, name }) => (
                            <div
                                key={locale}
                                onClick={handleChangeLanguage(locale)}
                                className="min-w-[90px] md:min-w-[150px] cursor-pointer px-6 py-2 bg-white hover:bg-gray-300  dark:bg-black dark:hover:bg-gray-700 transition-colors select-none text-responsive-xl"
                            >
                                {name}
                            </div>
                        ))}
                    </div>
                )}
                trigger="click"
                animation={false}
                zIndex={99999}
                offset={[14, 10]}
                hideOnClick={true}
            >
                <div
                    className={classNames(
                        'px-2 py-3 rounded-md flex items-center sm:cursor-pointer bg-white  dark:bg-transparent sm:hover:bg-gray-200 sm:dark:hover:bg-gray-700 transition-all select-none',
                        className,
                    )}
                    ref={ref}
                >
                    <AiOutlineGlobal className="w-[2.2rem] h-[2.2rem]" />
                    <p className="ml-[5px] hidden sm:block">
                        {currentLocale?.name}
                    </p>
                </div>
            </Tippy>
        );
    },
);

export default memo(LanguageSwitcher);
