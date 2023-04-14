import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import Spinner from './Spinner';
// import { useAuthContext } from '@/contexts/AuthContext';
import { useMeQuery } from '@/generated/graphql';

interface RejectedProps {
    children: ReactNode;
}

const Rejected = ({ children }: RejectedProps) => {
    // const { profile } = useAuthContext();
    const { loading, data } = useMeQuery();
    const profile = data?.me;
    const router = useRouter();

    useEffect(() => {
        if (
            !loading &&
            profile &&
            (router.route === '/login' ||
                router.route === '/register' ||
                router.route === '/forgot-password' ||
                router.route === '/change-password')
        ) {
            router.replace('/');
        }
    }, [router, profile, loading]);

    if (profile) {
        return <Spinner />;
    }

    return <>{children}</>;
};

export default Rejected;
