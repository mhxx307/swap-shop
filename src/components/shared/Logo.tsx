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
                'flex w-20 h-20 mx-auto object-contain',
                className,
            )}
        />
    );
};

export default memo(Logo);
