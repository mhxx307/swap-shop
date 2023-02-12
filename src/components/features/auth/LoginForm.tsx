import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { Button, InputField } from '@/components/shared';
import { useValidateSchema } from '@/hooks';
import {
    LoginInput,
    UserInfoDocument,
    UserInfoQuery,
    useLoginMutation,
} from '@/types/generated/graphql';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';

const LoginForm = () => {
    const { t } = useTranslation('login');
    const schema = useValidateSchema({ name: 'login' });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter();

    const { control, handleSubmit, setError } = useForm<LoginInput>({
        defaultValues: {
            usernameOrEmail: '',
            password: '',
        },
        resolver: yupResolver(schema),
    });

    const [login, { loading, error }] = useLoginMutation();

    if (error) return <p>Login error</p>;

    const handleLogin = async (payload: LoginInput) => {
        const response = await login({
            variables: {
                loginInput: payload,
            },
            update(cache, { data }) {
                if (data?.login.success) {
                    cache.writeQuery<UserInfoQuery>({
                        query: UserInfoDocument,
                        data: { userInfo: data.login.user },
                    });
                }
            },
        });

        if (response.data?.login.errors) {
            response.data?.login.errors.forEach((error) => {
                if (
                    error.field === 'usernameOrEmail' ||
                    error.field === 'password'
                ) {
                    setError(
                        error.field,
                        {
                            type: 'focus',
                            message: error.message,
                        },
                        { shouldFocus: true },
                    );
                }
            });
        } else if (response.data?.login.success) {
            toast.success(
                `Login successfully! WELCOME ${response.data?.login.user?.username}`,
            );
            router.push('/');
        }
    };

    return (
        <form
            method="POST"
            onSubmit={handleSubmit(handleLogin)}
            className="min-w-[260px] w-full space-y-4"
        >
            <InputField
                type="text"
                name="usernameOrEmail"
                control={control}
                containerInputClassName="default-input"
                label={t('username_label')!}
            />

            <InputField
                type={showPassword ? 'text' : 'password'}
                name="password"
                control={control}
                containerInputClassName="default-input"
                label={t('password_label')!}
                iconClassName="w-4 h-4 cursor-pointer hover:text-gray-500"
                rightIconOnClick={() => setShowPassword(!showPassword)}
                RightIcon={showPassword ? FaEye : FaEyeSlash}
            />

            <div className="flex flex-col space-y-3">
                <Button
                    type="submit"
                    primary
                    className="mt-[20px] w-full justify-center items-center select-none"
                    isLoading={loading}
                >
                    {t('button_login')!}
                </Button>

                <Button
                    type="button"
                    outline
                    className="w-full justify-center py-2 pr-6 pl-4 select-none hover:bg-blue-500 hover:text-white"
                    LeftIcon={FcGoogle}
                    iconClassName="w-5 h-5"
                >
                    {t('google_login')}
                </Button>
            </div>
        </form>
    );
};

export default LoginForm;
