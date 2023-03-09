import Image from './Image';
import classNames from 'classnames';

export interface AvatarProps {
    className?: string;
    src: string;
}

export default function Avatar({
    className,
    src = '/images/avatar-fallback.png',
}: AvatarProps) {
    return (
        <div className="flex-shrink-0">
            <Image
                className={classNames('h-11 w-11 rounded-full', className)}
                src={src ? src : '/images/avatar-fallback.png'}
                alt="avatar"
            />
            <div className="absolute ml-6 -mt-5 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-green-400 dark:border-gray-800"></div>
        </div>
    );
}
