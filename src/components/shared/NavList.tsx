import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { NavItemProps } from '@/types';

interface NavListProps {
    navList: NavItemProps[];
    className?: string;
    itemClassName?: string;
}

const NavList = ({ navList, className, itemClassName }: NavListProps) => {
    const router = useRouter();

    return (
        <nav className={classNames('space-x-10', className)}>
            {navList.map((item) => (
                <Link
                    href={item.path as string}
                    key={item.label}
                    className={classNames(
                        `nav-item
							${router.pathname === item.path ? 'text-primary-400 after:w-full' : ''}`,
                        itemClassName,
                    )}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
};

export default NavList;
