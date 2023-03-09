import classNames from 'classnames';
import { memo } from 'react';
import { Image } from '@/components/shared';
import Link from 'next/link';
import { path } from '@/constants';

const Logo: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
}) => {
    return (
        <Link href={path.home}>
            <Image
                src="/logo.svg"
                alt="logo"
                className={classNames(
                    'mx-auto flex h-20 w-20 object-contain',
                    className,
                )}
            />
        </Link>
    );
};

export default memo(Logo);
