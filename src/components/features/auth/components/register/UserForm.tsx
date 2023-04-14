import { InputField } from '@/components/shared';
import FormWrapper from '../FormWrapper';
import { FormProps } from './AccountForm';

const UserForm = ({ control }: FormProps) => {
    return (
        <FormWrapper title="User Details" description="Describe about yourself">
            <InputField
                label="Full name:"
                control={control}
                name="fullName"
                type="text"
            />
        </FormWrapper>
    );
};

export default UserForm;
