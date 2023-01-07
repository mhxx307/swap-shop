import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { HeaderNavListProps } from '@/types';

export interface NavMenuProps {
    navList: HeaderNavListProps[] | [];
    className?: string;
    itemClassName?: string;
}

const NavList = ({ navList, className, itemClassName }: NavMenuProps) => {
    const router = useRouter();
    const defaultItemStyles =
        'ml-[30px] capitalize font-bold hover:text-primary-500 transition-colors duration-300';

    return (
        <nav className={classNames(className)}>
            {navList.map(({ path, label }) => (
                <Link
                    href={path}
                    key={label}
                    className={classNames(
                        defaultItemStyles,
                        ` ${router.pathname === path && 'text-primary-500'} `,
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
