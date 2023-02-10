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

    if (error) return `Login error! ${error.message}`;

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
            router.push('/');
        }
    };

    return (
        <form
            method="POST"
            onSubmit={handleSubmit(handleLogin)}
            className="min-w-[260px] w-full"
        >
            <InputField
                type="text"
                name="usernameOrEmail"
                control={control}
                className="px-3 py-2 shadow-none"
                // containerInputClassName="border-[1px] border-gray-500 rounded-md focus-within:border-[#00b4d8]"
                label={t('username_label')!}
            />

            <InputField
                type={showPassword ? 'text' : 'password'}
                name="password"
                control={control}
                className="px-3 py-2"
                containerclassname="mt-[12px]"
                label={t('password_label')!}
                iconClassName="w-8 h-8 cursor-pointer hover:text-gray-500"
                rightIconOnClick={() => setShowPassword(!showPassword)}
                RightIcon={showPassword ? FaEye : FaEyeSlash}
            />

            <Button
                type="submit"
                primary
                className="mt-[20px] w-full justify-center items-center select-none"
                isLoading={loading}
            >
                {t('button_login')!}
            </Button>
        </form>
    );
};

export default LoginForm;
