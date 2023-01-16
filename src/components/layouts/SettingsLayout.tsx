import { useRouter } from 'next/router';
import { BaseLayoutProps } from '@/types/layoutTypes';
import { Header, Footer } from '@/components/partials';
import { Dropdown } from '@/components/shared';
import Link from 'next/link';

const settings = [
    { label: 'profile', path: '/settings/profile' },
    { label: 'notification', path: '/settings/notification' },
    { label: 'password', path: '/settings/password' },
];

const SettingsLayout = ({ children }: BaseLayoutProps) => {
    return (
        <main>
            <Header />
            <div className="app">
                <div className="wrapper pt-[100px] space-y-12">
                    <h3 className="text-4xl font-bold">Settings</h3>
                    <div className="border-bottom"></div>
                    <Dropdown className="block ss:hidden" dataList={settings} />
                    <div className="grid grid-cols-10">
                        <div className="hidden ss:block col-span-2 space-y-8">
                            <NavList navList={settings} />
                            <div className="border-bottom"></div>
                            <p className="text-primary-500 font-medium cursor-pointer mt-[20px]">
                                Delete Account
                            </p>
                        </div>
                        <div className="col-span-10 ss:col-span-8">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
};

interface SettingProps {
    label: string;
    path: string;
}

const NavList = ({ navList }: { navList: SettingProps[] }) => {
    const router = useRouter();

    return (
        <nav className="flex flex-col w-[130px] space-y-8">
            {navList.map(({ path, label }) => (
                <Link
                    href={path}
                    key={label}
                    className={`capitalize hover:opacity-70 transition-opacity
                ${
                    router.pathname === path &&
                    'text-black dark:text-white font-bold'
                }`}
                >
                    {label}
                </Link>
            ))}
        </nav>
    );
};

export default SettingsLayout;
