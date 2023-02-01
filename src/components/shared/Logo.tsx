import classNames from 'classnames';
import { memo } from 'react';
import { Image } from '@/components/shared';

const Logo: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
}) => {
    return (
        <Image
            src="/logo.svg"
            alt="logo"
            className={classNames(
                'flex w-16 h-16 mx-auto object-contain',
                className,
            )}
        />
    );
};

export default memo(Logo);
