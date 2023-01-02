import { useTranslation } from '@/hooks';
import { HeaderNavListProps, PopupMenuItemProps } from '@/types';
import { createContext, useState } from 'react';

interface ValueTypes {
    headerNavList: HeaderNavListProps[];
    popupMenuList: PopupMenuItemProps[];
    popupUserMenuList: PopupMenuItemProps[];
}

interface ContextProps {
    languageCode: string;
    setLanguageCode: React.Dispatch<React.SetStateAction<string>>;
    value: ValueTypes;
}

export const TranslationContext = createContext<ContextProps>({
    languageCode: 'vi',
    setLanguageCode: () => {},
    value: {
        headerNavList: [],
        popupMenuList: [],
        popupUserMenuList: [],
    },
});

export const TranslationProvider: React.FC<any> = ({ children }: any) => {
    const [languageCode, setLanguageCode] = useState<string>('vi');

    const value = useTranslation(languageCode);

    return (
        <TranslationContext.Provider
            value={{ languageCode, setLanguageCode, value }}
        >
            {children}
        </TranslationContext.Provider>
    );
};
