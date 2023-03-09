import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import Spinner from './Spinner';
import { useCheckAuth } from '@/hooks';

interface AuthProps {
    children: ReactNode;
}

const Auth = ({ children }: AuthProps) => {
    const { data, loading } = useCheckAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !data?.me) {
            router.push('/login');
        }
    }, [loading, router, data]);

    if (!data?.me) {
        return <Spinner />;
    }

    return <>{children}</>;
};

export default Auth;
