import { useRouter } from 'next/router';
import { BaseLayoutProps } from '@/types/layoutTypes';
import { Header, Footer } from '@/components/partials';
import { SettingsDropdown } from '@/components/shared';
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
                <div className="wrapper header-height space-y-12">
                    <h3 className="text-4xl font-bold">Settings</h3>
                    <div className="border-bottom"></div>
                    <SettingsDropdown
                        className="block ss:hidden"
                        dataList={settings}
                    />
                    <div className="grid grid-cols-10">
                        <div className="col-span-2 hidden space-y-8 pr-10 ss:block">
                            <NavList navList={settings} />
                            <div className="border-bottom"></div>
                            <p className="mt-[20px] cursor-pointer font-medium text-primary-500">
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
        <nav className="flex w-[130px] flex-col space-y-8">
            {navList.map(({ path, label }) => (
                <Link
                    href={path}
                    key={label}
                    className={`capitalize transition-opacity hover:opacity-70
                ${
                    router.pathname === path &&
                    'font-bold text-black dark:text-white'
                }`}
                >
                    {label}
                </Link>
            ))}
        </nav>
    );
};

export default SettingsLayout;
