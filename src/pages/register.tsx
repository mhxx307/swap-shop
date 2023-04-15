import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';

import { RegisterForm } from '@/components/features/auth';
import { BaseLayout } from '@/components/layouts';
import { CommonSection, Head, Rejected } from '@/components/shared';
import { path } from '@/constants';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

const RegisterPage = () => {
    const { t } = useTranslation('common');

    return (
        <Rejected>
            <Head />
            <div className="flex w-full flex-col">
                <CommonSection title="Registration" />
                <div className="flex-center relative min-h-screen w-full bg-[#f0f0f0] dark:bg-primaryDark">
                    <div className="absolute top-2 left-2 flex space-x-4">
                        <Link
                            className="flex-center h-[35px] bg-black text-white shadow-3xl dark:hover:bg-gray-700 md:px-[25px]"
                            href={path.home}
                        >
                            <AiOutlineHome />
                        </Link>
                        <Link
                            className="flex-center h-[35px] bg-black text-white shadow-md dark:hover:bg-gray-700 md:px-[25px]"
                            href={path.login}
                        >
                            {t('login')}
                        </Link>
                    </div>
                    <RegisterForm />
                </div>
            </div>
        </Rejected>
    );
};

// eslint-disable-next-line react/display-name
RegisterPage.Layout = (page: ReactNode) => (
    <BaseLayout showFooter={false} showHeader={false}>
        {page}
    </BaseLayout>
);

export default RegisterPage;
