import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';
import ClientOnly from './ClientOnly';

// https://dev.to/mrpbennett/creating-a-dark-theme-switch-with-tailwind-framer-motion-4f4h
const ThemeSwitcher = () => {
    const { isOn, setIsOn } = useTheme();

    const spring = {
        type: 'spring',
        stiffness: 700,
        damping: 30,
    };

    return (
        <ClientOnly>
            <button
                onClick={() => setIsOn(!isOn)}
                className={`flex-start flex h-[30px] w-[60px] rounded-[50px] bg-zinc-100 shadow-inner hover:cursor-pointer dark:bg-zinc-700 ${
                    isOn && 'place-content-end'
                }`}
            >
                <motion.div
                    initial={{ y: '0%' }}
                    className="flex h-[100%] w-[30px] items-center justify-center rounded-full bg-black/90"
                    layout
                    transition={spring}
                >
                    <motion.div whileTap={{ rotate: 360 }}>
                        {isOn ? (
                            <RiSunFill className="h-6 w-6 text-yellow-300" />
                        ) : (
                            <RiMoonClearFill className="h-6 w-6 text-slate-200" />
                        )}
                    </motion.div>
                </motion.div>
            </button>
        </ClientOnly>
    );
};

export default ThemeSwitcher;
