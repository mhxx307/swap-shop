import { useCallback, useState, memo } from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { motion } from 'framer-motion';
import classNames from 'classnames';

const variants = {
    hidden: {
        opacity: 0,
    },

    visible: {
        opacity: 1,
    },
};

export interface ImageProps extends NextImageProps {
    classnamewrapper?: string;
    className?: string;
    fallbackImg?: string;
}

const Image: React.FC<ImageProps> = ({ onLoadingComplete, src, ...props }) => {
    const {
        classnamewrapper,
        className,
        fallbackImg = '/images/avatar-fallback.png',
    } = props;

    const [isLoaded, setIsLoaded] = useState(false);
    const [fallback, setFallback] = useState<string>('');

    const handleError = () => {
        setFallback(fallbackImg);
    };

    const handleLoadingComplete: NextImageProps['onLoadingComplete'] =
        useCallback(
            (result: any) => {
                setIsLoaded(true);
                onLoadingComplete?.(result);
            },
            [onLoadingComplete],
        );

    return (
        <motion.div
            initial="hidden"
            variants={variants}
            animate={isLoaded ? 'visible' : 'hidden'}
            className={classNames('flex-shrink-0', classnamewrapper)}
        >
            <NextImage
                src={fallback || src}
                onLoadingComplete={handleLoadingComplete}
                unoptimized
                {...props}
                width={props.width || 100}
                height={props.height || 100}
                className={classNames('h-full w-full flex-shrink-0', className)}
                onError={handleError}
            />
        </motion.div>
    );
};

export default memo(Image);
