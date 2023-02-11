import { useUserInfoQuery } from '@/types/generated/graphql';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useCheckAuth = () => {
    const { data, loading } = useUserInfoQuery();
    const router = useRouter();

    useEffect(() => {
        if (
            !loading &&
            data?.userInfo &&
            (router.route === '/login' || router.route === '/register')
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
