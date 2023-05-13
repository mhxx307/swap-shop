import { createContext, useContext, useState } from 'react';

interface AppContextInterface {
    isShowMap: boolean;
    setIsShowMap: React.Dispatch<React.SetStateAction<boolean>>;
}

export const getInitialAppContext: () => AppContextInterface = () => ({
    isShowMap: false,
    setIsShowMap: () => null,
});

const initialAppContext = getInitialAppContext();

export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppProvider = ({
    children,
    defaultValue = initialAppContext,
}: {
    children: React.ReactNode;
    defaultValue?: AppContextInterface;
}) => {
    const [isShowMap, setIsShowMap] = useState<boolean>(defaultValue.isShowMap);

    return (
        <AppContext.Provider
            value={{
                isShowMap,
                setIsShowMap,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AuthProvider');
    }
    return context;
};
