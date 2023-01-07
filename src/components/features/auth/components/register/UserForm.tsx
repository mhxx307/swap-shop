import { FormWrapper, InputField } from '@/components/shared';
import { FormProps } from './AccountForm';

const UserForm = ({ control }: FormProps) => {
    return (
        <FormWrapper title="User Details" description="Describe about yourself">
            <InputField
                label="First Name:"
                control={control}
                name="firstName"
                autoFocus
                type="text"
                containerInputClassName="register-input shadow-none"
            />

            <InputField
                label="Last name:"
                control={control}
                name="lastName"
                type="text"
                containerInputClassName="register-input shadow-none"
            />

            <InputField
                label="Age"
                control={control}
                name="age"
                type="number"
                containerClassName="w-[100px]"
            />
        </FormWrapper>
    );
};

export default UserForm;
