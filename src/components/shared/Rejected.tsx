import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import Spinner from './Spinner';
import { useAuthContext } from '@/contexts/AuthContext';

interface RejectedProps {
    children: ReactNode;
}

const Rejected = ({ children }: RejectedProps) => {
    const { profile } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (
            profile &&
            (router.route === '/login' ||
                router.route === '/register' ||
                router.route === '/forgot-password' ||
                router.route === '/change-password')
        ) {
            router.replace('/');
        }
    }, [router, profile]);

    if (profile) {
        return <Spinner />;
    }

    return <>{children}</>;
};

export default Rejected;
