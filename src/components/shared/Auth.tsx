import { useUserInfoQuery } from '@/types/generated/graphql';

interface AuthProps {
    children: any;
}

const Auth = ({ children }: AuthProps) => {
    const { data, loading, error } = useUserInfoQuery();

    return <>{children}</>;
};

export default Auth;
