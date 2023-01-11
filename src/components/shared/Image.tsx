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

interface ImageProps extends NextImageProps {
    containerclassname?: string;
    className?: string;
}

const Image: React.FC<ImageProps> = ({ onLoadingComplete, ...props }) => {
    const { containerclassname, className } = props;

    const [isLoaded, setIsLoaded] = useState(false);

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
            className={containerclassname}
        >
            <NextImage
                onLoadingComplete={handleLoadingComplete}
                unoptimized
                {...props}
                width={props.width || 100}
                height={props.height || 100}
                className={classNames('w-full h-full', className)}
            />
        </motion.div>
    );
};

export default memo(Image);
