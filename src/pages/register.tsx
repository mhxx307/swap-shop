import { RegisterForm } from '@/components/features/auth';
import { BaseLayout } from '@/components/layouts';
import { ButtonLink } from '@/components/shared';
import { AiOutlineHome } from 'react-icons/ai';

const RegisterPage = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center bg-[#f0f0f0] dark:bg-primaryDark relative">
            <ButtonLink
                shortcutKey="enter"
                className="h-[35px] shadow-md bg-black text-white absolute top-10 left-10 hidden dark:hover:bg-gray-700 md:ml-[20px] md:px-[25px] sm:block"
                href="/"
            >
                <AiOutlineHome />
            </ButtonLink>
            <ButtonLink
                shortcutKey="enter"
                className="h-[35px] shadow-md bg-black text-white absolute top-10 left-40 hidden dark:hover:bg-gray-700 md:ml-[20px] md:px-[25px] sm:block"
                href="/login"
            >
                login
            </ButtonLink>
            <RegisterForm />
            {/* them description cho form */}
            {/* map picker */}
            {/* options cho country and state => dropdown => tìm api => getServerProps */}
            {/* xác dịnh lại các thuộc tính sẽ lưu vào model account */}
            {/* form validate */}
            {/* them switcher */}
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
