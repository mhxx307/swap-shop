import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import Spinner from './Spinner';
import { useAuthContext } from '@/contexts/AuthContext';

interface AuthProps {
    children: ReactNode;
}

const Auth = ({ children }: AuthProps) => {
    const { profile } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (!profile) {
            router.push('/login');
        }
    }, [router, profile]);

    if (!profile) {
        return <Spinner />;
    }

    return <>{children}</>;
};

export default Auth;
