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

const Header = () => {
    const { t } = useTranslation('header');
    const router = useRouter();
    const { HEADER_NAV_LIST, POPUP_MENU_LIST, POPUP_USER_MENU_LIST }: any =
        useConstantsTranslation();
    const currentUser = false;

    return (
        <header
            className="container flex items-center justify-between h-[60px] md:h-[80px]
            [&>*:first-child]:ml-0 dark:bg-secondaryDark"
        >
            <div className="flex items-center">
                <GoThreeBars className="mr-[10px] mobile-show" />
                <Link href="/">
                    <Logo />
                </Link>
                <NavList navList={HEADER_NAV_LIST} className="mobile-hidden" />
            </div>
            <div className="flex items-center">
                <LanguageSwitcher />

                <Input
                    LeftIcon={AiOutlineSearch}
                    leftIconOnClick={() => console.log('search')}
                    placeholder={t('search_placeholder') || '...'}
                    iconClassName="w-[22px] h-[22px] text-gray-500 cursor-pointer hover:text-primary-500"
                    containerClassName="ml-[16px] mobile-hidden"
                    className="pl-[5px] py-[5px] text-black caret-primary-500"
                    containerInputClassName="bg-[#F2F3F6]"
                />

                <Link href="/search">
                    <AiOutlineSearch
                        className={`mr-[10px] w-[2rem] h-[2rem] mobile-show`}
                    />
                </Link>

                {!currentUser && (
                    <Button
                        primary
                        shortcutKey="enter"
                        className="md:ml-[20px] md:px-[25px] h-full shadow-md"
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
                        <AiOutlineMore className="w-[30px] h-[30px] ml-[6px] sm:cursor-pointer" />
                    )}
                </PopupMenu>
            </div>
        </header>
    );
};

export default Header;
