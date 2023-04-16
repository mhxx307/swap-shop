import { BaseLayout } from '@/components/layouts';
import { Button, Rejected } from '@/components/shared';
import { useForgotPasswordMutation } from '@/generated/graphql';
import { ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [forgotPassword, { loading, data }] = useForgotPasswordMutation();
    const { t } = useTranslation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await forgotPassword({ variables: { forgotPasswordInput: { email } } });
    };

    useEffect(() => {
        if (!data?.forgotPassword.success) {
            toast.error(data?.forgotPassword.message, {
                toastId: 'wrong',
            });
        }

        if (data?.forgotPassword.success) {
            toast.success(data?.forgotPassword.message, {
                toastId: 'success',
            });
        }
    }, [data]);

    return (
        <Rejected>
            <section className="bg-gray-50 dark:bg-primaryDark">
                <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
                    <p className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
                        {t('title1')}
                    </p>
                    <div className="w-full rounded-lg bg-white p-6 shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md sm:p-8 md:mt-0">
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                            {t('title2')}
                        </h2>
                        <form
                            className="mt-4 space-y-4 md:space-y-5 lg:mt-5"
                            action="#"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    {t('label_input1')}
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                    placeholder={
                                        t('placeholder_input1') ||
                                        'name@company.com'
                                    }
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>

                            <div className="flex items-start">
                                <div className="flex h-5 items-center">
                                    <input
                                        id="newsletter"
                                        aria-describedby="newsletter"
                                        type="checkbox"
                                        className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                        required
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label
                                        htmlFor="newsletter"
                                        className="font-light text-gray-500 dark:text-gray-300"
                                    >
                                        {t('term1')}{' '}
                                        <div className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                            {t('term2')}
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <Button
                                primary
                                type="submit"
                                isLoading={loading}
                                className="flex-center w-full"
                            >
                                {t('button_submit')}
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </Rejected>
    );
}

// eslint-disable-next-line react/display-name
ForgotPassword.Layout = (page: ReactNode) => (
    <BaseLayout showFooter={false} showHeader={false}>
        {page}
    </BaseLayout>
);
