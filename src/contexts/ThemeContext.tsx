import { createContext, useEffect, useState } from 'react';

interface ContextProps {
    isOn: boolean;
    setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeContext = createContext<ContextProps>({
    isOn: false,
    setIsOn: () => {},
});

export interface ThemeProviderProps {
    children: React.ReactNode;
}

//developer.school/snippets/react/localstorage-is-not-defined-nextjs
const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const theme =
        (typeof window !== 'undefined' && localStorage.getItem('theme')) ||
        'light';

    const [isOn, setIsOn] = useState(() => {
        if (theme === 'light') {
            return true;
        } else {
            return false;
        }
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (isOn) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        }

        if (
            localStorage.theme === 'light' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: light)').matches)
        ) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isOn]);

    return (
        <ThemeContext.Provider value={{ isOn, setIsOn }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
