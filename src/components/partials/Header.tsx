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
import { BsBellFill } from 'react-icons/bs';
import { path } from '@/constants';
import { useAuthContext } from '@/contexts/AuthContext';
import JWTManager from '@/utils/jwt';

const Header = () => {
    const [navbar, setNavbar] = useState<boolean>(false);
    const { data } = useMeQuery();
    /*{
        fetchPolicy: 'no-cache', // only fetch new data from server
    }*/
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
    const { logoutClient } = useAuthContext();

    const me = data?.me;
    console.log(me);
    const menuList = me ? POPUP_USER_MENU_LIST : POPUP_MENU_LIST;

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
            variables: { userId: JWTManager.getUserId() as string },
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
        logoutClient();
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
            className="fixed z-20 flex w-full flex-col shadow-md transition-colors [&>*:first-child]:ml-0"
        >
            <div className={` bg-white ${navbar && 'hidden'}`}>
                <div className="container flex items-center justify-between">
                    <Logo />

                    {/* language switcher, notification, login, bar */}
                    <div className="flex items-center space-x-4">
                        <Search className="hidden md:flex" />

                        <LanguageSwitcher />

                        {isMobile && (
                            <Link href="/download">
                                <AiOutlineDownload className="h-6 w-6" />
                            </Link>
                        )}

                        <BsBellFill className="h-4 w-4 transition-colors hover:text-gray-500" />

                        {!me && (
                            <Button
                                primary
                                shortcutKey="enter"
                                onClick={() => router.push(path.login)}
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
                                            key={item.path}
                                            href={item.path}
                                            className="block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                    {me && (
                                        <button
                                            className="block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500"
                                            onClick={handleLogout}
                                        >
                                            {t('logout')}
                                        </button>
                                    )}
                                </div>
                            }
                        >
                            {me ? (
                                <Image
                                    src="https://www.adobe.com/express/feature/image/media_16ad2258cac6171d66942b13b8cd4839f0b6be6f3.png?width=750&format=png&optimize=medium"
                                    alt="dog avatar"
                                    className="h-8 w-8 rounded-[50%] object-cover sm:cursor-pointer"
                                />
                            ) : (
                                <AiOutlineMore
                                    className={`h-8 w-8 text-black sm:cursor-pointer`}
                                />
                            )}
                        </Popover>
                    </div>
                </div>
            </div>

            {/* ${
                    navbar && 'backdrop-blur-sm shadow-3xl bg-black/30'
                } */}
            <div className="bg-[#1b1b1b] py-3">
                <div className="container flex items-center justify-between">
                    <div className="flex-center">
                        <HamburgerNavbar
                            data={HEADER_MOBILE_NAV_LIST}
                            className="block cursor-pointer text-white md:hidden"
                        />

                        <NavList
                            navList={HEADER_NAV_LIST}
                            className="hidden items-center justify-between md:flex"
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
