import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import Spinner from './Spinner';
import { useMeQuery } from '@/generated/graphql';
// import { useAuthContext } from '@/contexts/AuthContext';

interface AuthProps {
    children: ReactNode;
}

const Auth = ({ children }: AuthProps) => {
    // const { profile } = useAuthContext();
    const { loading, data } = useMeQuery();
    const profile = data?.me;
    const router = useRouter();

    useEffect(() => {
        if (!loading && !profile) {
            router.push('/login');
        }
    }, [router, profile, loading]);

    if (!profile) {
        return <Spinner />;
    }

    return <>{children}</>;
};

export default Auth;
