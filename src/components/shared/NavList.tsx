import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

export interface NavMenuProps {
    navList: { path: string; label: string }[];
    className?: string;
    itemClassName?: string;
}

const NavList = ({ navList, className, itemClassName }: NavMenuProps) => {
    const router = useRouter();
    const defaultItemStyles =
        'ml-[20px] capitalize font-bold hover:text-primary-500';

    return (
        <nav className={classNames(className)}>
            {navList.map(({ path, label }) => (
                <Link
                    href={path}
                    key={label}
                    className={classNames(
                        itemClassName,
                        defaultItemStyles,
                        ` ${router.pathname === path && 'text-primary-500'} `,
                    )}
                >
                    {label}
                </Link>
            ))}
        </nav>
    );
};

export default NavList;
