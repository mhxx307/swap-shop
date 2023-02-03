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
                                    className="cursor-pointer px-6 py-2 select-none text-responsive-sm transition-colors bg-white dark:bg-primaryDark"
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
                        ref={ref}
                        className={classNames('text-black', className)}
                    >
                        <AiOutlineGlobal className="block sm:hidden w-[22px] h-[22px]" />
                        <p className="ml-[5px] hidden sm:block font-medium cursor-pointer hover:text-primary-500">
                            {currentLocale?.name}
                        </p>
                    </div>
                </Tippy>
            </div>
        );
    },
);

export default memo(LanguageSwitcher);
