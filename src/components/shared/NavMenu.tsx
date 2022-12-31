import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

export interface NavMenuProps {
    navList: { path: string; label: string }[];
    className?: string;
}

export default function NavMenu({ navList, className }: NavMenuProps) {
    const router = useRouter();
    const defaultStyles =
        'ml-[20px] capitalize text-[1.6rem] font-medium hover:text-primary-500';

    return (
        <nav className="hidden md:block">
            {navList.map(({ path, label }) => (
                <Link
                    href={path}
                    key={label}
                    className={classNames(
                        className,
                        `${defaultStyles} ${
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
