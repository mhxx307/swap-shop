import { FormWrapper, InputField } from '@/components/shared';
import { Control } from 'react-hook-form';

export interface FormProps {
    control: Control<any>;
}

const AccountForm = ({ control }: FormProps) => {
    return (
        <FormWrapper title="Account Creation">
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
        </FormWrapper>
    );
};

export default AccountForm;
