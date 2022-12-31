import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { logoPNG } from '@/images';
import { Button, NavMenu } from '@/components/shared';
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
                <NavMenu
                    navList={HEADER_NAV_LIST}
                    className="hidden md:block"
                />
            </div>
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Tìm kiếm"
                    spellCheck="false"
                    className="hidden md:block w-[288px] h-[40px] pl-[20px]
                    rounded-[6px] outline-none bg-[#F2F3F6] border-[1px]
                    border-[#d9d9d9] text-[1.6rem] caret-primary-500 focus:border-[#999]"
                />
                <Button
                    primary
                    shortcutKey="enter"
                    onClick={() => router.push('/login')}
                    className="ml-[20px]"
                >
                    <p>Đăng nhập</p>
                </Button>
            </div>
        </header>
    );
};

export default Header;
