import { ThemeContext } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';

// https://dev.to/mrpbennett/creating-a-dark-theme-switch-with-tailwind-framer-motion-4f4h
const ThemeSwitcher = () => {
    const { isOn, setIsOn } = useContext(ThemeContext);
    console.log(isOn);

    const spring = {
        type: 'spring',
        stiffness: 700,
        damping: 30,
    };

    return (
        <div
            onClick={() => setIsOn(!isOn)}
            className={`flex-start flex h-[30px] w-[60px] rounded-[50px] bg-zinc-100 shadow-inner hover:cursor-pointer dark:bg-zinc-700 ${
                isOn && 'place-content-end'
            }`}
        >
            <motion.div
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
        </div>
    );
};

export default ThemeSwitcher;
