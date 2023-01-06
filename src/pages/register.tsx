import { RegisterForm } from '@/components/features/auth';
import { BaseLayout } from '@/components/layouts';

const RegisterPage = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center bg-[#f0f0f0] dark:bg-primaryDark">
            <RegisterForm />
        </div>
    );
};

// eslint-disable-next-line react/display-name
RegisterPage.Layout = (page: any) => (
    <BaseLayout showFooter={false} showHeader={false}>
        {page}
    </BaseLayout>
);

export default RegisterPage;
