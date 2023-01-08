import classNames from 'classnames';
import { memo } from 'react';
import { Image } from '@/components/shared';

const Logo: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
}) => {
    return (
        <Image
            src="/logo.png"
            alt="logo"
            className={classNames(
                'flex w-24 h-24 mx-auto object-contain',
                className,
            )}
        />
    );
};

export default memo(Logo);
