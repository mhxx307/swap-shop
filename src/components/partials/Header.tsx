import Link from 'next/link';
import { useRouter } from 'next/router';
import {
    AiOutlineMore,
    AiOutlineSearch,
    AiOutlineDownload,
} from 'react-icons/ai';
import { GoThreeBars } from 'react-icons/go';
import { MdNotifications } from 'react-icons/md';
import {
    Button,
    NavList,
    Logo,
    PopupMenu,
    Image,
    LanguageSwitcher,
    ThemeSwitcher,
    Notification,
} from '@/components/shared';
import { useTranslation } from 'next-i18next';
import { useConstantsTranslation, useDevice } from '@/hooks';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
    const [navbar, setNavbar] = useState<boolean>(false);

    const router = useRouter();
    const { t } = useTranslation('header');
    const {
        HEADER_NAV_LIST,
        POPUP_MENU_LIST,
        POPUP_USER_MENU_LIST,
        HEADER_MOBILE_NAV_LIST,
    }: any = useConstantsTranslation();

    const mobileHide = 'hidden md:flex';
    const mobileShow = 'block md:hidden';

    const { isMobile } = useDevice();

    const currentUser = false;

    useEffect(() => {
        window.addEventListener('scroll', changeBackground);

        return () => {
            window.removeEventListener('scroll', changeBackground);
        };
    }, []);

    const changeBackground = () => {
        if (window.scrollY >= 80) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };

    return (
        <motion.header
            initial={{ opacity: 0, y: -180 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                ease: 'easeInOut',
                duration: 1,
                delay: 0.6,
            }}
            className={`wrapper w-full flex items-center justify-between h-[60px] md:h-[80px]
                [&>*:first-child]:ml-0 ${
                    navbar
                        ? 'backdrop-blur-sm shadow-3xl bg-white/30 dark:bg-black/30'
                        : 'bg-transparent'
                }  fixed z-[100] transition-colors border-b-[1px] border-white/30`}
        >
            <div className="flex items-center space-x-2">
                <PopupMenu items={HEADER_MOBILE_NAV_LIST} hideOnClick>
                    <GoThreeBars className={`w-6 h-6 ${mobileShow}`} />
                </PopupMenu>

                <Link href="/" className={mobileHide}>
                    <Logo />
                </Link>
                <ThemeSwitcher />
            </div>

            <NavList navList={HEADER_NAV_LIST} className={mobileHide} />

            <Link href="/" className={mobileShow}>
                <Logo />
            </Link>

            <div className="flex items-center space-x-2">
                <LanguageSwitcher />

                {isMobile && (
                    <Link href="/download">
                        <AiOutlineDownload className="w-6 h-6" />
                    </Link>
                )}

                <Notification />

                {!currentUser && (
                    <Button
                        primary
                        shortcutKey="enter"
                        onClick={() => router.push('/login')}
                    >
                        {t('login_title')}
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
                            className="rounded-[50%] w-8 h-8 object-coversm:cursor-pointer"
                        />
                    ) : (
                        <AiOutlineMore
                            className={`w-8 h-8 sm:cursor-pointer sm:hover:text-primary-500`}
                        />
                    )}
                </PopupMenu>
            </div>
        </motion.header>
    );
};

export default Header;
