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
                                className="w-[150px] cursor-pointer px-6 py-2 hover:bg-gray-300  dark:bg-black dark:hover:bg-gray-700 transition-colors"
                            >
                                {name}
                            </div>
                        ))}
                    </div>
                )}
                trigger="click"
                animation={false}
                zIndex={9999}
                offset={[14, 10]}
                hideOnClick={true}
            >
                <div
                    className={classNames(
                        'px-2 py-3 rounded-md flex items-center cursor-pointer bg-gray-300 hover:opacity-80 dark:bg-black dark:hover:bg-gray-700 transition-all',
                        className,
                    )}
                    ref={ref}
                >
                    <AiOutlineGlobal />
                    <p className="ml-[5px]">{currentLocale?.name}</p>
                </div>
            </Tippy>
        );
    },
);

export default memo(LanguageSwitcher);
