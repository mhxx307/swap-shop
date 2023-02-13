import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineMore, AiOutlineDownload } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';

import {
    Button,
    NavList,
    Logo,
    PopupMenu,
    Image,
    LanguageSwitcher,
    Notification,
    Search,
    ThemeSwitcher,
    HamburgerNavbar,
} from '@/components/shared';
import { useConstantsTranslation, useDevice } from '@/hooks';
import {
    UserInfoDocument,
    UserInfoQuery,
    useLogoutMutation,
    useUserInfoQuery,
} from '@/types/generated/graphql';
import { toast } from 'react-toastify';

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
    const { isMobile } = useDevice();

    const { data } = useUserInfoQuery();
    const [logout] = useLogoutMutation();
    const currentUser = data?.userInfo;

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

    const handleChangeMenu = async (item: any) => {
        if (!item.path)
            await logout({
                update(cache, { data }) {
                    toast.success('Logout successfully');
                    if (data?.logout) {
                        cache.writeQuery<UserInfoQuery>({
                            query: UserInfoDocument,
                            data: { userInfo: null },
                        });
                    }
                },
            });
    };

    return (
        <motion.header
            initial={{ opacity: 0, y: -180 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                ease: 'easeInOut',
                duration: 1,
                delay: 0.3,
            }}
            className="w-full flex flex-col [&>*:first-child]:ml-0 fixed z-[100] transition-colors shadow-md"
        >
            <div
                className={`wrapper flex items-center justify-between bg-white ${
                    navbar && 'hidden'
                }`}
            >
                <Link href="/">
                    <Logo />
                </Link>

                {/* language switcher, notification, login, bar */}
                <div className="flex items-center space-x-4">
                    <Search className="hidden md:flex" />

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
                            <p className="line-clamp-1">{t('login_title')}</p>
                        </Button>
                    )}

                    <PopupMenu
                        items={
                            currentUser ? POPUP_USER_MENU_LIST : POPUP_MENU_LIST
                        }
                        onChange={handleChangeMenu}
                        hideOnClick
                    >
                        {currentUser ? (
                            <Image
                                src="https://www.adobe.com/express/feature/image/media_16ad2258cac6171d66942b13b8cd4839f0b6be6f3.png?width=750&format=png&optimize=medium"
                                alt="dog avatar"
                                className="rounded-[50%] w-8 h-8 object-cover sm:cursor-pointer"
                            />
                        ) : (
                            <AiOutlineMore
                                className={`w-8 h-8 sm:cursor-pointer text-black`}
                            />
                        )}
                    </PopupMenu>
                </div>
            </div>

            {/* ${
                    navbar && 'backdrop-blur-sm shadow-3xl bg-black/30'
                } */}
            <div className="wrapper bg-[#1b1b1b] flex items-center justify-between py-3">
                <div className="flex items-center space-x-4">
                    <HamburgerNavbar
                        data={HEADER_MOBILE_NAV_LIST}
                        className="block md:hidden text-white cursor-pointer"
                    />
                    <NavList
                        navList={HEADER_NAV_LIST}
                        className="items-center justify-between hidden md:flex"
                    />
                    <Search className="block md:hidden" />
                </div>

                <ThemeSwitcher />
            </div>
        </motion.header>
    );
};

export default Header;
