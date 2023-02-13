import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { BaseLayout } from '@/components/layouts';
import { Button, InputField } from '@/components/shared';
import { useValidateSchema } from '@/hooks';
import { ChangePasswordPayload } from '@/types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useChangePasswordMutation } from '@/types/generated/graphql';
import { toast } from 'react-toastify';

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const schema = useValidateSchema({ name: 'password' });
    const router = useRouter();
    const {
        query: { userId, token },
    } = router;

    const { control, handleSubmit } = useForm<ChangePasswordPayload>({
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
        resolver: yupResolver(schema),
        mode: 'all',
    });

    const [changePassword, { loading, data }] = useChangePasswordMutation();

    const handleChangePassword = async (payload: ChangePasswordPayload) => {
        if (token && userId) {
            await changePassword({
                variables: {
                    changePasswordInput: {
                        newPassword: payload.password,
                    },
                    token: token as string,
                    userId: userId as string,
                },
            });
        } else {
            toast.error('You do not have token!');
        }
    };

    useEffect(() => {
        if (!data?.changePassword.success) {
            toast.error('Fail!!! Token maybe wrong or expired', {
                toastId: 'error',
            });
        }

        if (data?.changePassword.success) {
            toast.success('Change password successfully', {
                toastId: 'success',
            });
            router.push('/');
        }
    }, [data, router]);

    return (
        <section className="bg-gray-50 dark:bg-primaryDark">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    Change password
                </a>
                <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Change Password
                    </h2>
                    <form
                        method="POST"
                        className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
                        onSubmit={handleSubmit(handleChangePassword)}
                    >
                        <InputField
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="......"
                            control={control}
                            containerInputClassName="default-input"
                            label="New password"
                            iconClassName="w-4 h-4 cursor-pointer hover:text-gray-500"
                            rightIconOnClick={() =>
                                setShowPassword(!showPassword)
                            }
                            RightIcon={showPassword ? FaEye : FaEyeSlash}
                        />

                        <InputField
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder="......"
                            control={control}
                            containerInputClassName="default-input"
                            label="Confirm password"
                            iconClassName="w-4 h-4 cursor-pointer hover:text-gray-500"
                            rightIconOnClick={() =>
                                setShowConfirmPassword(!showPassword)
                            }
                            RightIcon={showConfirmPassword ? FaEye : FaEyeSlash}
                        />

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
                            isLoading={loading}
                            type="submit"
                            className="w-full flex-center"
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ChangePassword;

// eslint-disable-next-line react/display-name
ChangePassword.Layout = (page: any) => (
    <BaseLayout showFooter={false} showHeader={false}>
        {page}
    </BaseLayout>
);
