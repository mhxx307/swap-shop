import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineMore, AiOutlineSearch } from 'react-icons/ai';
import { GoThreeBars } from 'react-icons/go';
import {
    Button,
    NavList,
    Input,
    Logo,
    PopupMenu,
    Image,
    LanguageSwitcher,
} from '@/components/shared';
import { useTranslation } from 'next-i18next';
import { useConstantsTranslation } from '@/hooks';
import { BsMoonStars, BsSun } from 'react-icons/bs';

const Header = () => {
    const { t } = useTranslation('header');
    const router = useRouter();
    const { HEADER_NAV_LIST, POPUP_MENU_LIST, POPUP_USER_MENU_LIST }: any =
        useConstantsTranslation();
    const currentUser = false;

    const mobileHide = 'hidden sm:flex';
    const mobileShow = 'block sm:hidden';

    const isDarkTheme = false;

    return (
        <header
            className="container flex items-center justify-between h-[60px] md:h-[80px]
            [&>*:first-child]:ml-0 dark:bg-secondaryDark"
        >
            <div className="flex items-center">
                <GoThreeBars className={`mr-[10px] ${mobileShow}`} />
                <Link href="/">
                    <Logo />
                </Link>
            </div>
            <NavList
                navList={HEADER_NAV_LIST}
                className={`[&>*:first-child]:ml-0 ${mobileHide}`}
            />
            <div className="flex items-center">
                <LanguageSwitcher />

                {/* <Input
                    LeftIcon={AiOutlineSearch}
                    leftIconOnClick={() => console.log('search')}
                    placeholder={t('search_placeholder') || '...'}
                    iconClassName="w-[2.2rem] h-[2.2rem] text-gray-500 sm:cursor-pointer sm:hover:text-primary-500"
                    containerClassName={`ml-[16px] ${mobileHide}`}
                    className="pl-[5px] py-[5px] text-black caret-primary-500"
                    containerInputClassName="bg-[#F2F3F6]"
                /> */}

                <Button className="bg-gray-300 ml-[15px] sm:ml-[20px] h-[40px] w-[40px]">
                    {isDarkTheme ? <BsMoonStars /> : <BsSun />}
                </Button>

                <Link href="/search">
                    <AiOutlineSearch className="ml-[15px] sm:ml-[20px] w-[2.2rem] h-[2.2rem] sm:hover:text-primary-500 transition-colors" />
                </Link>

                {!currentUser && (
                    <Button
                        primary
                        shortcutKey="enter"
                        className="ml-[15px] sm:ml-[20px] sm:px-[25px] h-full shadow-md"
                        onClick={() => router.push('/login')}
                    >
                        <span>{t('login_title')}</span>
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
                        <AiOutlineMore className="w-[30px] h-[30px] ml-[6px] sm:cursor-pointer sm:hover:text-primary-500" />
                    )}
                </PopupMenu>
            </div>
        </header>
    );
};

export default Header;
