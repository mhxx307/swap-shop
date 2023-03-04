import { BaseLayout } from '@/components/layouts';
import { Button } from '@/components/shared';
import { useCheckAuth } from '@/hooks';
import { useForgotPasswordMutation } from '@/types/generated/graphql';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
    const { data: authData, loading: authLoading } = useCheckAuth();
    const [email, setEmail] = useState('');
    const [forgotPassword, { loading, data }] = useForgotPasswordMutation();

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

    if (authLoading || (!authLoading && authData?.me)) {
        return <p>Loading...</p>;
    }

    return (
        <section className="bg-gray-50 dark:bg-primaryDark">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    Forgot password
                </a>
                <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Change Password
                    </h2>
                    <form
                        className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
                        action="#"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>

                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="newsletter"
                                    aria-describedby="newsletter"
                                    type="checkbox"
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                    required
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label
                                    htmlFor="newsletter"
                                    className="font-light text-gray-500 dark:text-gray-300"
                                >
                                    I accept the{' '}
                                    <a
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                        href="#"
                                    >
                                        Terms and Conditions
                                    </a>
                                </label>
                            </div>
                        </div>
                        <Button
                            primary
                            type="submit"
                            isLoading={loading}
                            className="w-full flex-center"
                        >
                            Enter email to reset password
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}

// eslint-disable-next-line react/display-name
ForgotPassword.Layout = (page: any) => (
    <BaseLayout showFooter={false} showHeader={false}>
        {page}
    </BaseLayout>
);
