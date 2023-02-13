import { FormWrapper, InputField } from '@/components/shared';
import { useState } from 'react';
import { Control } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export interface FormProps {
    control: Control<any>;
}

const AccountForm = ({ control }: FormProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);

    return (
        <FormWrapper
            title="Account Creation"
            description="Create info for your account"
        >
            <InputField
                label="Email:"
                type="email"
                name="email"
                control={control}
                autoFocus
                placeholder="john@gmail.com"
            />

            <InputField
                label="Username:"
                type="username"
                name="username"
                control={control}
                placeholder="john"
            />

            <InputField
                label="Password:"
                type={showPassword ? 'text' : 'password'}
                name="password"
                control={control}
                rightIconOnClick={() => setShowPassword(!showPassword)}
                RightIcon={showPassword ? FaEye : FaEyeSlash}
                iconClassName="cursor-pointer text-gray-500 dark:text-white"
            />

            <InputField
                label="Confirm password:"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                control={control}
                rightIconOnClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                }
                RightIcon={showConfirmPassword ? FaEye : FaEyeSlash}
                iconClassName="cursor-pointer text-gray-500 dark:text-white"
            />
        </FormWrapper>
    );
};

export default AccountForm;
