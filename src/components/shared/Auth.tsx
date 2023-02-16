import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Spinner from './Spinner';
import { useUserInfoQuery } from '@/types/generated/graphql';
import { toast } from 'react-toastify';

interface AuthProps {
    children: any;
}

const Auth = ({ children }: AuthProps) => {
    const { data, loading } = useUserInfoQuery();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !data?.userInfo) {
            toast.error('You need login first!', { toastId: 'success' });
            router.push('/login');
        }
    }, [loading, router, data]);

    if (!data?.userInfo) {
        return <Spinner />;
    }

    return <>{children}</>;
};

export default Auth;
