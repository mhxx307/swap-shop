import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button, InputField } from '@/components/shared';
import { LoginPayload } from '@/types';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
    .object({
        username: yup
            .string()
            .required('Please enter your username')
            .min(4, 'Username must be at least 4 characters long'),
        password: yup
            .string()
            .required('Please enter your password')
            .min(8, 'Password must be at least 8 characters long'),
    })
    .required();

const LoginForm = () => {
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
        <form method="POST" onSubmit={handleSubmit(handleLogin)}>
            <InputField
                type="text"
                name="username"
                control={control}
                className="px-3 py-2"
                label="Username:"
            />

            <InputField
                type={showPassword ? 'text' : 'password'}
                name="password"
                control={control}
                className="px-3 py-2"
                containerClassName="mt-[8px]"
                label="Password:"
                iconClassName="w-8 h-8 cursor-pointer hover:text-gray-500"
                rightIconOnClick={() => setShowPassword(!showPassword)}
                RightIcon={showPassword ? FaEye : FaEyeSlash}
            />

            <Button type="submit" primary className="mt-[20px]">
                Login
            </Button>
        </form>
    );
};

export default LoginForm;
