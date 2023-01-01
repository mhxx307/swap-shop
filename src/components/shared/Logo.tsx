import classNames from 'classnames';
import { memo } from 'react';
import { Image } from '@/components/shared';

const Logo: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
    ...props
}) => {
    return (
        <div
            className={classNames('relative flex mx-auto h-24 w-24', className)}
            {...props}
        >
            <Image
                src="/logo.png"
                alt="logo"
                className="object-contain"
                layout="fill"
            />
        </div>
    );
};

export default memo(Logo);
