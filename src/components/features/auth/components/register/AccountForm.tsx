import { FormWrapper, InputField } from '@/components/shared';
import { Control } from 'react-hook-form';

export interface FormProps {
    control: Control<any>;
}

const AccountForm = ({ control }: FormProps) => {
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
                containerInputClassName="register-input shadow-none"
            />

            <InputField
                label="Password:"
                type="password"
                name="password"
                control={control}
                containerInputClassName="register-input shadow-none"
            />

            <InputField
                label="Confirm password:"
                type="password"
                name="confirmPassword"
                control={control}
                containerInputClassName="register-input shadow-none"
            />
        </FormWrapper>
    );
};

export default AccountForm;
