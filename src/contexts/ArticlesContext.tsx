import { createContext, useState } from 'react';

interface ArticlesContextType {
    hasMore: boolean;
    setHasMore: (hasMore: boolean) => void;
}

export const ArticlesContext = createContext<ArticlesContextType>({
    hasMore: true,
    setHasMore: () => {},
});

export const ArticlesProvider = ({ children }: { children: any }) => {
    const [hasMore, setHasMore] = useState(true);

    return (
        <ArticlesContext.Provider value={{ hasMore, setHasMore }}>
            {children}
        </ArticlesContext.Provider>
    );
};
