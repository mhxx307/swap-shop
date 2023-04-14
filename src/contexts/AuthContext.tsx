import { User } from '@/generated/graphql';
import { createContext, useContext, useState } from 'react';
import { getProfileFromLS } from 'src/utils/auth';

interface AuthContextInterface {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    profile: User | null;
    setProfile: React.Dispatch<React.SetStateAction<User | null>>;
    reset: () => void;
}

export const getInitialAuthContext: () => AuthContextInterface = () => ({
    isAuthenticated: Boolean(getProfileFromLS()),
    setIsAuthenticated: () => null,
    profile: getProfileFromLS(),
    setProfile: () => null,
    reset: () => null,
});

const initialAuthContext = getInitialAuthContext();

export const AuthContext =
    createContext<AuthContextInterface>(initialAuthContext);

export const AuthProvider = ({
    children,
    defaultValue = initialAuthContext,
}: {
    children: React.ReactNode;
    defaultValue?: AuthContextInterface;
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        defaultValue.isAuthenticated,
    );
    const [profile, setProfile] = useState<User | null>(defaultValue.profile);

    const reset = () => {
        setIsAuthenticated(false);
        setProfile(null);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                profile,
                setProfile,
                reset,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within a AuthProvider');
    }
    return context;
};
