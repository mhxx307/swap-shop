import Link from 'next/link';
import { useRouter } from 'next/router';
import {
    AiOutlineMore,
    AiOutlineSearch,
    AiOutlineDownload,
} from 'react-icons/ai';
import { GoThreeBars } from 'react-icons/go';
import {
    Button,
    NavList,
    Logo,
    PopupMenu,
    Image,
    LanguageSwitcher,
    ThemeSwitcher,
} from '@/components/shared';
import { useTranslation } from 'next-i18next';
import { useConstantsTranslation, useDevice } from '@/hooks';

const Header = () => {
    const { t } = useTranslation('header');
    const router = useRouter();
    const { HEADER_NAV_LIST, POPUP_MENU_LIST, POPUP_USER_MENU_LIST }: any =
        useConstantsTranslation();
    const currentUser = false;

    const mobileHide = 'hidden md:flex';
    const mobileShow = 'block md:hidden';

    const { isMobile } = useDevice();

    return (
        <header
            className="container flex items-center justify-between py-[10px] h-[60px] md:h-[80px]
            [&>*:first-child]:ml-0 dark:bg-secondaryDark shadow-md"
        >
            <div className="flex items-center">
                <GoThreeBars
                    className={`mr-[10px] w-[22px] h-[22px] ${mobileShow}`}
                />

                <Link href="/" className={`mr-[10px] ${mobileHide}`}>
                    <Logo />
                </Link>
                <ThemeSwitcher />
            </div>

            <NavList
                navList={HEADER_NAV_LIST}
                className={`[&>*:first-child]:ml-0  ${mobileHide}`}
                itemClassName="ml-[30px]"
            />

            <Link href="/" className={mobileShow}>
                <Logo />
            </Link>

            <div className="flex items-center">
                <LanguageSwitcher />

                {isMobile && (
                    <Link href="/download">
                        <AiOutlineDownload className="w-[22px] h-[22px] ml-[16px]" />
                    </Link>
                )}

                <Link href="/search" className={mobileHide}>
                    <AiOutlineSearch className="w-[22px] h-[22px] ml-[15px] sm:ml-[20px] sm:hover:text-primary-500 transition-colors" />
                </Link>

                {!currentUser && (
                    <Button
                        primary
                        shortcutKey="enter"
                        className="ml-[15px] sm:ml-[20px] sm:px-[25px] shadow-md"
                        onClick={() => router.push('/login')}
                    >
                        <span className="text-[1.4rem] md:text-[1.6rem]">
                            {t('login_title')}
                        </span>
                    </Button>
                )}

                <PopupMenu
                    items={currentUser ? POPUP_USER_MENU_LIST : POPUP_MENU_LIST}
                    onChange={() => console.log('menu change')}
                    hideOnClick
                >
                    {currentUser ? (
                        <Image
                            src="https://www.adobe.com/express/feature/image/media_16ad2258cac6171d66942b13b8cd4839f0b6be6f3.png?width=750&format=png&optimize=medium"
                            alt="dog avatar"
                            className="rounded-[50%] w-[32px] h-[32px] object-cover ml-[12px] sm:cursor-pointer"
                        />
                    ) : (
                        <AiOutlineMore
                            className={`w-[30px] h-[30px] ml-[6px] sm:cursor-pointer sm:hover:text-primary-500`}
                        />
                    )}
                </PopupMenu>
            </div>
        </header>
    );
};

export default Header;
