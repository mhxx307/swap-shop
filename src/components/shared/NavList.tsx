import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

export interface NavMenuProps {
    navList: any[];
    className?: string;
    itemClassName?: string;
}

const NavList = ({ navList, className, itemClassName }: NavMenuProps) => {
    const router = useRouter();

    return (
        <nav className={classNames('space-x-6', className)}>
            {navList.map(({ path, label }) => (
                <Link
                    href={path}
                    key={label}
                    className={classNames(
                        `nav-item
                        ${
                            router.pathname === path &&
                            'text-primary-500 dark:text-white after:w-full'
                        }`,
                        itemClassName,
                    )}
                >
                    {label}
                </Link>
            ))}
        </nav>
    );
};

export default NavList;
