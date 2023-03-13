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
            {navList.map(({ path, label }) => (
                <Link
                    href={path as string}
                    key={label}
                    className={classNames(
                        `nav-item
							${router.pathname === path ? ' text-white after:w-full' : 'text-[#d6d3d1]'}`,
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
