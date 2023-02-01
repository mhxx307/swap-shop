import { RegisterForm } from '@/components/features/auth';
import { BaseLayout } from '@/components/layouts';
import { ButtonLink, Head } from '@/components/shared';
import { AiOutlineHome } from 'react-icons/ai';

const RegisterPage = () => {
    return (
        <>
            <Head />
            <div className="w-full min-h-screen flex-center bg-[#f0f0f0] dark:bg-primaryDark relative">
                <div className="absolute top-2 left-2 flex space-x-4">
                    <ButtonLink
                        shortcutKey="enter"
                        className="h-[35px] shadow-3xl bg-black text-white dark:hover:bg-gray-700 md:px-[25px] "
                        href="/"
                    >
                        <AiOutlineHome />
                    </ButtonLink>
                    <ButtonLink
                        shortcutKey="enter"
                        className="h-[35px] shadow-md bg-black text-white dark:hover:bg-gray-700 md:px-[25px]"
                        href="/login"
                    >
                        login
                    </ButtonLink>
                </div>
                <RegisterForm />
            </div>
        </>
    );
};

// eslint-disable-next-line react/display-name
RegisterPage.Layout = (page: any) => (
    <BaseLayout showFooter={false} showHeader={false}>
        {page}
    </BaseLayout>
);

export default RegisterPage;
