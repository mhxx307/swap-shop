import classNames from 'classnames';
import { memo } from 'react';
import Link from 'next/link';
import { path } from '@/constants';
import { useTheme } from '@/contexts/ThemeContext';

const Logo: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
}) => {
    const { isOn } = useTheme();
    return (
        <Link href={path.home} className="py-4">
            {/* <Image
                src="/logo.svg"
                alt="logo"
                className={classNames(
                    'mx-auto flex h-20 w-20 object-contain',
                    className,
                )}
            /> */}
            <h1
                style={{
                    background:
                        'linear-gradient(-45deg, #e250e5, #4b50e6, #e250e5, #4b50e6)',
                    backgroundSize: '100% 100%',
                    backgroundClip: 'text',
                    marginBottom: 0,
                    WebkitTextStroke: '3px transparent',
                    WebkitTextFillColor: isOn ? '#14141f' : '#fff',
                    WebkitBackgroundClip: 'text',
                }}
                className={classNames('text-3xl', className)}
            >
                SC
            </h1>
        </Link>
    );
};

export default memo(Logo);
