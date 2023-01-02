import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AiOutlineMore, AiOutlineSearch } from 'react-icons/ai';
import { GoThreeBars } from 'react-icons/go';
import {
    Button,
    NavList,
    Input,
    Logo,
    PopupMenu,
    Image,
} from '@/components/shared';
import { TranslationContext } from '@/contexts/TranslationContext';

const Header = () => {
    const router = useRouter();
    const mobileShow = 'block md:hidden';
    const mobileHidden = 'hidden md:flex';

    const { value, setLanguageCode, languageCode } =
        useContext(TranslationContext);

    const currentUser = false;

    const handleMenuChange = (item: any) => {
        console.log(item);
        setLanguageCode(item.code);
    };

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
                <NavList
                    navList={value.headerNavList}
                    className={`${mobileHidden}`}
                />
            </div>

            <div className="flex items-center">
                <Input
                    LeftIcon={AiOutlineSearch}
                    leftIconOnClick={() => console.log('search')}
                    placeholder={languageCode === 'vi' ? 'Tìm kiếm' : 'Search'}
                    iconClassName="w-[22px] h-[22px] text-gray-500 cursor-pointer hover:text-primary-500"
                    containerClassName={mobileHidden}
                    className="pl-[5px] py-[5px] text-black caret-primary-500"
                    containerInputClassName=" bg-[#F2F3F6]"
                />

                <Link href="/search">
                    <AiOutlineSearch
                        className={`mr-[10px] w-[2rem] h-[2rem] ${mobileShow}`}
                    />
                </Link>

                {!currentUser && (
                    <Button
                        primary
                        shortcutKey="enter"
                        className="md:ml-[20px] md:px-[25px] h-full shadow-md"
                        onClick={() => router.push('/login')}
                    >
                        <span>
                            {languageCode == 'vi' ? 'Đăng nhập' : 'Login'}
                        </span>
                    </Button>
                )}

                <PopupMenu
                    items={
                        currentUser
                            ? value.popupUserMenuList
                            : value.popupMenuList
                    }
                    onChange={handleMenuChange}
                    hideOnClick
                >
                    {currentUser ? (
                        <Image
                            src="https://www.adobe.com/express/feature/image/media_16ad2258cac6171d66942b13b8cd4839f0b6be6f3.png?width=750&format=png&optimize=medium"
                            alt="dog avatar"
                            className="rounded-[50%] w-[32px] h-[32px] object-cover ml-[12px] sm:cursor-pointer"
                            width={1}
                            height={1}
                        />
                    ) : (
                        <AiOutlineMore className="w-[30px] h-[30px] ml-[12px] sm:cursor-pointer" />
                    )}
                </PopupMenu>
            </div>
        </header>
    );
};

export default Header;
