import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineMore, AiOutlineDownload } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';

import {
    Button,
    NavList,
    Logo,
    Image,
    LanguageSwitcher,
    Search,
    ThemeSwitcher,
    HamburgerNavbar,
    Popover,
} from '@/components/shared';
import { useConstantsTranslation, useDevice } from '@/hooks';
import {
    MeDocument,
    MeQuery,
    useLogoutMutation,
    useMeQuery,
} from '@/generated/graphql';
import { path } from '@/constants';
import { getTextColorByPath } from '@/utils';
import { Notification } from '../features/notification';

const Header = () => {
    const [navbar, setNavbar] = useState<boolean>(false);
    const router = useRouter();
    const { t } = useTranslation('header');
    const {
        HEADER_NAV_LIST,
        HEADER_MOBILE_NAV_LIST,
        POPUP_USER_MENU_LIST,
        POPUP_MENU_LIST,
    } = useConstantsTranslation();
    const { isMobile } = useDevice();
    const [logout] = useLogoutMutation();

    const { data: meData } = useMeQuery({
        onError: () => {
            // refresh
            router.reload();
            toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
        },
    });
    const profile = meData?.me;

    const menuList = profile ? POPUP_USER_MENU_LIST : POPUP_MENU_LIST;
    const textColor = getTextColorByPath(router.pathname);

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

    const handleLogout = async () => {
        await logout({
            update(cache, { data }) {
                toast.success('Logout successfully');
                if (data?.logout) {
                    cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: { me: null },
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
            className="fixed z-20 flex w-full flex-col [&>*:first-child]:ml-0"
        >
            <div className={`bg-transparent ${navbar && 'hidden'}`}>
                <div className="container flex items-center justify-between">
                    <Logo />

                    {/* language switcher, notification, login, bar */}
                    <div className="flex items-center space-x-6">
                        <Search className="hidden md:flex" />

                        <LanguageSwitcher />

                        {isMobile && (
                            <Link href="/download">
                                <AiOutlineDownload className="h-6 w-6" />
                            </Link>
                        )}

                        <Notification />

                        {!profile && (
                            <Button
                                primary
                                outline
                                shortcutKey="enter"
                                onClick={() => router.push(path.login)}
                                className="rounded-full"
                            >
                                <p className="line-clamp-1">
                                    {t('login_title')}
                                </p>
                            </Button>
                        )}

                        <Popover
                            renderPopover={
                                <div className="relative rounded-sm border border-gray-200 bg-white shadow-md">
                                    {menuList.map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.path}
                                            className="block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-primary-500"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                    {profile && (
                                        <button
                                            className="block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-primary-500"
                                            onClick={handleLogout}
                                        >
                                            {t('logout')}
                                        </button>
                                    )}
                                </div>
                            }
                        >
                            {profile ? (
                                <Image
                                    src={
                                        profile?.avatar ||
                                        '/images/avatar-fallback.png'
                                    }
                                    alt={profile.username}
                                    className="h-8 w-8 rounded-[50%] object-cover sm:cursor-pointer"
                                />
                            ) : (
                                <AiOutlineMore
                                    className={`h-8 w-8 sm:cursor-pointer ${textColor}`}
                                />
                            )}
                        </Popover>
                    </div>
                </div>
            </div>

            <div
                className={` py-3  ${
                    navbar ? 'bg-white dark:bg-primaryDark' : 'bg-transparent'
                } ${
                    navbar &&
                    ' shadow-headerLight backdrop-blur-3xl dark:shadow-headerDark'
                }`}
            >
                <div className="container flex items-center justify-between">
                    <div className="flex-center">
                        <HamburgerNavbar
                            data={HEADER_MOBILE_NAV_LIST}
                            className="block cursor-pointer text-white md:hidden"
                        />

                        <NavList
                            navList={HEADER_NAV_LIST}
                            className="hidden items-center justify-between md:flex"
                            itemClassName={`${
                                navbar
                                    ? 'text-black dark:text-white'
                                    : textColor
                            }`}
                        />

                        <Search className="block md:hidden" />
                    </div>

                    <ThemeSwitcher />
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
