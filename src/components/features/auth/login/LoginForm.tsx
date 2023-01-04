import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { Button, InputField } from '@/components/shared';
import { LoginPayload } from '@/types';

const LoginForm = () => {
    const schema = yup
        .object({
            username: yup
                .string()
                .required('Please enter your username')
                .min(4, 'Username must be at least 4 characters long')
                .max(20, 'Username must be at most 20 characters long'),
            password: yup
                .string()
                .required('Please enter your password')
                .min(8, 'Password must be at least 8 characters long')
                .max(20, 'Password must be at most 20 characters long'),
        })
        .required();

    const [showPassword, setShowPassword] = useState(false);

    const { control, handleSubmit } = useForm<LoginPayload>({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: yupResolver(schema),
    });

    const handleLogin = (loginPayload: LoginPayload) => {
        console.log(loginPayload);
    };

    return (
        <form
            method="POST"
            onSubmit={handleSubmit(handleLogin)}
            className="min-w-[260px] w-full"
        >
            <InputField
                type="text"
                name="username"
                control={control}
                className="px-3 py-2 shadow-none"
                // containerInputClassName="border-[1px] border-gray-500 rounded-md focus-within:border-[#00b4d8]"
                label="Username:"
            />

            <InputField
                type={showPassword ? 'text' : 'password'}
                name="password"
                control={control}
                className="px-3 py-2"
                containerClassName="mt-[12px]"
                label="Password:"
                iconClassName="w-8 h-8 cursor-pointer hover:text-gray-500"
                rightIconOnClick={() => setShowPassword(!showPassword)}
                RightIcon={showPassword ? FaEye : FaEyeSlash}
            />

            <Button
                type="submit"
                primary
                className="mt-[20px] w-full justify-center items-center select-none"
            >
                Sign in
            </Button>
        </form>
    );
};

export default LoginForm;
