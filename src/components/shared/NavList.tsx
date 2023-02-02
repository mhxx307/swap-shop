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
                        `nav-item drop-shadow-lg
                        ${
                            router.pathname === path
                                ? ' text-black dark:text-white after:w-full'
                                : 'text-black/50 dark:text-[#d6d3d1]'
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
