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
            <div>
                <Tippy
                    interactive={true}
                    render={(attrs) => (
                        <div className="shadow-3xl">
                            {locales.map(({ locale, name }) => (
                                <div
                                    key={locale}
                                    onClick={handleChangeLanguage(locale)}
                                    className="min-w-[90px] md:min-w-[150px] cursor-pointer px-6 py-2 bg-white/70 dark:bg-black/70 backdrop-blur-sm hover:bg-gray-300 dark:hover:bg-black/50 select-none text-responsive-sm transition-colors"
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
                            'px-2 py-3 rounded-md flex items-center sm:cursor-pointer bg-transparent sm:hover:bg-white/30 select-none transition-colors',
                            className,
                        )}
                        ref={ref}
                    >
                        <AiOutlineGlobal className="w-[22px] h-[22px]" />
                        <p className="ml-[5px] hidden sm:block font-medium">
                            {currentLocale?.name}
                        </p>
                    </div>
                </Tippy>
            </div>
        );
    },
);

export default memo(LanguageSwitcher);
