import Image from './Image';
import classNames from 'classnames';

export interface AvatarProps {
    className?: string;
    src?: string;
}

export default function Avatar({
    className,
    src = '/images/avatar-fallback.png',
}: AvatarProps) {
    return (
        <div className="flex-shrink-0">
            <Image
                className={classNames('rounded-full w-11 h-11', className)}
                src={src}
                alt="avatar"
            />
            <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-green-400 border border-white rounded-full dark:border-gray-800"></div>
        </div>
    );
}
