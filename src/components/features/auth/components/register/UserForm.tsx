import {  FormWrapper, InputField } from '@/components/shared';
import { FormProps } from './AccountForm';

const UserForm = ({ control }: FormProps) => {
    return (
        <FormWrapper title="User Details" description="Describe about yourself">
            <InputField
                label="Full name:"
                control={control}
                name="fullName"
                autoFocus
                type="text"
            />

            <InputField
                label="Phone number:"
                control={control}
                name="phoneNumber"
                type="text"
            />

			<InputField
                label="Date of birth:"
                control={control}
                name="birthday"
                type="date"
            />

        </FormWrapper>
    );
};

export default UserForm;
