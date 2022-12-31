import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { logoPNG } from '@/images';
import { Button, NavList, Input } from '@/components/shared';
import { HEADER_NAV_LIST } from '@/constants/vi';

const Header = () => {
    const router = useRouter();
    return (
        <header
            className="container flex items-center justify-between h-40
            [&>*:first-child]:ml-0"
        >
            <div className="block md:hidden">menu mobile</div>
            <div className="flex items-center">
                <Link href="/">
                    <Image
                        src={logoPNG}
                        alt="logo"
                        className="w-[100px] h-[60px] rounded-[20px]"
                    />
                </Link>
                <NavList navList={HEADER_NAV_LIST} className="hidden md:flex" />
            </div>

            <div className="flex items-center">
                <Input
                    placeholder="Tìm kiếm"
                    className="pl-[10px] py-[5px] caret-primary-500 text-black"
                    containerInputClassName="bg-[#F2F3F6]"
                />
                <Button
                    primary
                    shortcutKey="enter"
                    className="ml-[20px] px-[25px]"
                    onClick={() => router.push('/login')}
                >
                    <span>Đăng nhập</span>
                </Button>
            </div>
        </header>
    );
};

export default Header;
