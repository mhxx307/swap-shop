import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button, InputField } from '@/components/shared';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleLogin = (data: any) => {
        console.log(data);
    };

    return (
        <form method="POST" onSubmit={handleSubmit(handleLogin)}>
            <InputField
                type="text"
                name="email"
                control={control}
                className="px-3 py-2"
                label="Email"
            />

            <InputField
                type={showPassword ? 'text' : 'password'}
                name="password"
                control={control}
                className="px-3 py-2"
                containerClassName="mt-[8px]"
                label="Password"
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
