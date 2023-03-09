import { useMeQuery } from '@/generated/graphql';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useCheckAuth = () => {
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

    return {
        data,
        loading,
    };
};

export default useCheckAuth;
