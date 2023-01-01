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
} from '@/components/shared';
import { HEADER_NAV_LIST, MENU_ITEMS, USER_MENU } from '@/constants/vi';

const Header = () => {
    const router = useRouter();
    const mobileShow = 'block md:hidden';
    const mobileHidden = 'hidden md:block';

    const currentUser = false;

    const handleMenuChange = () => {
        console.log('hello');
    };

    return (
        <header
            className="container flex items-center justify-between h-[60px] md:h-[80px]
            [&>*:first-child]:ml-0"
        >
            <div className="flex items-center">
                <GoThreeBars className={`mr-[10px] ${mobileShow}`} />
                <Link href="/">
                    <Logo />
                </Link>
                <NavList
                    navList={HEADER_NAV_LIST}
                    className={`${mobileHidden}`}
                />
            </div>

            <div className="flex items-center">
                <Input
                    LeftIcon={AiOutlineSearch}
                    iconClassName="w-[20px] h-[20px] text-gray-500 cursor-pointer hover:text-primary-500"
                    leftIconOnClick={() => console.log('search')}
                    placeholder="Tìm kiếm"
                    className={`pl-[5px] py-[5px] caret-primary-500 text-black ${mobileHidden}`}
                    containerInputClassName="bg-[#F2F3F6]"
                />

                <AiOutlineSearch className={`mr-[10px] ${mobileShow}`} />

                {!currentUser && (
                    <Button
                        primary
                        shortcutKey="enter"
                        className="md:ml-[20px] md:px-[25px] h-full shadow-md"
                        onClick={() => router.push('/login')}
                    >
                        <span>Đăng nhập</span>
                    </Button>
                )}

                <PopupMenu
                    items={currentUser ? USER_MENU : MENU_ITEMS}
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
                        <AiOutlineMore
                            className={`w-[30px] h-[30px] ml-[12px] sm:cursor-pointer ${mobileHidden}`}
                        />
                    )}
                </PopupMenu>
            </div>
        </header>
    );
};

export default Header;
