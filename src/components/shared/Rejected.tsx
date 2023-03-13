import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import Spinner from './Spinner';
import { useMeQuery } from '@/generated/graphql';

interface RejectedProps {
    children: ReactNode;
}

const Rejected = ({ children }: RejectedProps) => {
    const { data, loading } = useMeQuery();
    const router = useRouter();

    useEffect(() => {
        if (
            !loading &&
            data?.me &&
            (router.route === '/login' ||
                router.route === '/register' ||
                router.route === '/forgot-password' ||
                router.route === '/change-password')
        ) {
            router.replace('/');
        }
    }, [loading, router, data]);

    if (data?.me) {
        return <Spinner />;
    }

    return <>{children}</>;
};

export default Rejected;
