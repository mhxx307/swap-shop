import locales from '@/locales.json';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { memo, useMemo } from 'react';
// import { AiOutlineGlobal } from 'react-icons/ai';
import Popover from './Popover';
import { path } from '@/constants';

// eslint-disable-next-line react/display-name
const LanguageSwitcher = () => {
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
        <Popover
            renderPopover={
                <div className="rounded-sm border border-gray-200 bg-white shadow-3xl">
                    {locales.map(({ locale, name }) => (
                        <button
                            key={locale}
                            onClick={handleChangeLanguage(locale)}
                            className="flex w-full flex-col py-2 pr-28 pl-3 hover:bg-slate-100 hover:text-primary-500"
                        >
                            {name}
                        </button>
                    ))}
                </div>
            }
        >
            <div
                className={`cursor-pointer ${
                    router.pathname === path.market ? 'text-white' : ''
                }`}
            >
                {currentLocale?.name}
            </div>
        </Popover>
    );
};

export default memo(LanguageSwitcher);
