import Link from 'next/link';
import { useRouter } from 'next/router';

import { AiOutlineMore, AiOutlineSearch } from 'react-icons/ai';
import { GoThreeBars } from 'react-icons/go';
import { Button, NavList, Input, Logo } from '@/components/shared';
import { HEADER_NAV_LIST } from '@/constants/vi';

const Header = () => {
    const router = useRouter();
    const mobileShow = 'block md:hidden';
    const mobileHidden = 'hidden md:block';

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
                    placeholder="Tìm kiếm"
                    className={`pl-[10px] py-[5px] caret-primary-500 text-black ${mobileHidden}`}
                    containerInputClassName="bg-[#F2F3F6]"
                />
                <AiOutlineSearch className={`mr-[10px] ${mobileShow}`} />
                <Button
                    primary
                    shortcutKey="enter"
                    className="md:ml-[20px] md:px-[25px]"
                    onClick={() => router.push('/login')}
                >
                    <span>Đăng nhập</span>
                </Button>
                <AiOutlineMore
                    className={`w-[30px] h-[30px] ${mobileHidden}`}
                />
            </div>
        </header>
    );
};

export default Header;
