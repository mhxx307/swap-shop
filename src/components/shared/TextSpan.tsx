import classNames from 'classnames';
import { motion } from 'framer-motion';

const spanVariants = {
    visible: { y: 0, scaleY: 1 },
    hover: {
        y: [-1, -2, -2.8, 0.9, 0],
        scaleY: [1, 1.3, 0.8, 1, 1.2],
        color: 'red',
    },
};

const item = {
    visible: {
        opacity: 1,
        y: [-1, -1.9, -2.7, 1],
        scaleY: [1, 1.3, 0.8, 1],
    },

    hidden: {
        opacity: 0,
    },
};

const list = {
    visible: {
        opacity: 1,
        transition: {
            when: 'beforeChildren',
            staggerChildren: 0.1,
        },
    },
    hidden: {
        opacity: 0,
        transition: {
            when: 'afterChildren',
        },
    },
};

interface TextSpanProps {
    text: string;
    className?: string;
}

const TextSpan = ({ text, className }: TextSpanProps) => {
    const sentence = text.split('');
    return (
        <motion.div
            variants={list}
            initial="hidden"
            animate="visible"
            className={(classNames('relative inline-block'), className)}
        >
            {sentence.map((letter: string, index: number) => (
                <motion.span
                    key={index}
                    variants={item}
                    className="relative inline-block"
                >
                    <motion.span
                        variants={spanVariants}
                        initial="visible"
                        whileHover="hover"
                        className="relative inline-block"
                    >
                        {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                </motion.span>
            ))}
        </motion.div>
    );
};

export default TextSpan;
