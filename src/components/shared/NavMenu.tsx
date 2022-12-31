import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

export interface NavMenuProps {
    navList: { path: string; label: string }[];
    className?: string;
    itemClassName?: string;
}

export default function NavMenu({
    navList,
    className,
    itemClassName,
}: NavMenuProps) {
    const router = useRouter();
    const defaultItemStyles =
        'ml-[20px] capitalize text-[1.6rem] font-medium hover:text-primary-500';

    return (
        <nav className={classNames(className)}>
            {navList.map(({ path, label }) => (
                <Link
                    href={path}
                    key={label}
                    className={classNames(
                        itemClassName,
                        `${defaultItemStyles} ${
                            router.pathname === path && 'text-primary-500'
                        } `,
                    )}
                >
                    {label}
                </Link>
            ))}
        </nav>
    );
}
