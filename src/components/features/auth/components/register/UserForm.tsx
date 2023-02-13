import { DateField, FormWrapper, InputField } from '@/components/shared';
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

            <DateField control={control} name="date" />
        </FormWrapper>
    );
};

export default UserForm;
