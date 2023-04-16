import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { BaseLayout } from '@/components/layouts';
import { Button, InputField, Rejected } from '@/components/shared';
import { useValidateSchema } from '@/hooks';
import { useChangePasswordMutation } from '@/generated/graphql';

interface FormState {
    password: string;
    confirmPassword: string;
}

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const schema = useValidateSchema('changePassword');
    const router = useRouter();
    const {
        query: { userId, token },
    } = router;

    const { control, handleSubmit } = useForm<FormState>({
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
        resolver: yupResolver(schema),
        mode: 'all',
    });

    const [changePassword, { loading, data }] = useChangePasswordMutation();

    const handleChangePassword = async (payload: FormState) => {
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
        if (data?.changePassword.success) {
            toast.success('Change password successfully', {
                toastId: 'success',
            });
            router.push('/');
        }
    }, [data, router, token]);

    return (
        <Rejected>
            <section className="bg-gray-50 dark:bg-primaryDark">
                <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
                    <span className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
                        Change password
                    </span>
                    <div className="w-full rounded-lg bg-white p-6 shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md sm:p-8 md:mt-0">
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                            Change Password
                        </h2>
                        <form
                            method="POST"
                            className="mt-4 space-y-4 md:space-y-5 lg:mt-5"
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
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                RightIcon={
                                    showConfirmPassword ? FaEye : FaEyeSlash
                                }
                            />

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
                                        I accept the{' '}
                                        <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                            Terms and Conditions
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <Button
                                primary
                                isLoading={loading}
                                type="submit"
                                className="flex-center w-full"
                            >
                                Submit
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </Rejected>
    );
};

export default ChangePassword;

// eslint-disable-next-line react/display-name
ChangePassword.Layout = (page: ReactNode) => (
    <BaseLayout showFooter={false} showHeader={false}>
        {page}
    </BaseLayout>
);
