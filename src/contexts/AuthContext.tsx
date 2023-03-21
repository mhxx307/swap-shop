import { createContext, useCallback, useContext, useState } from 'react';
import JWTManager from '../utils/jwt';

interface ContextProps {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuth: () => Promise<void>;
    logoutClient: () => void;
}

const initialAuthContext: ContextProps = {
    isAuthenticated: false,
    setIsAuthenticated: () => null,
    checkAuth: () => Promise.resolve(),
    logoutClient: () => null,
};

export const AuthContext = createContext<ContextProps>(initialAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        initialAuthContext.isAuthenticated,
    );

    const checkAuth = useCallback(async () => {
        const token = JWTManager.getToken();
        if (token) {
            setIsAuthenticated(true);
        } else {
            const isSuccess = await JWTManager.getRefreshToken();
            if (isSuccess) setIsAuthenticated(true);
        }
    }, []);

    const logoutClient = () => {
        JWTManager.deleteToken();
        setIsAuthenticated(false);
    };

    const authContextData: ContextProps = {
        isAuthenticated,
        setIsAuthenticated,
        checkAuth,
        logoutClient,
    };

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
