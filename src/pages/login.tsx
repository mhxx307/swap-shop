import { LoginForm } from '@/components/features/auth/login';

const LoginPage = () => {
    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <LoginForm />
        </div>
    );
};

// eslint-disable-next-line react/display-name
LoginPage.Layout = (page: any) => <>{page}</>;

export default LoginPage;
