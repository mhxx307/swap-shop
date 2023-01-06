import { FormWrapper, InputField } from '@/components/shared';
import { FormProps } from './AccountForm';

const AddressForm = ({ control }: FormProps) => {
    return (
        <FormWrapper title="Address">
            <InputField
                autoFocus
                label="Street"
                type="text"
                name="street"
                control={control}
                containerInputClassName="register-input shadow-none"
            />

            <InputField
                label="City:"
                type="text"
                name="city"
                control={control}
                containerInputClassName="register-input shadow-none"
            />

            <InputField
                label="State"
                type="text"
                name="state"
                control={control}
                containerInputClassName="register-input shadow-none"
            />

            <InputField
                label="Zip"
                type="text"
                name="zip"
                control={control}
                containerInputClassName="register-input shadow-none"
            />
        </FormWrapper>
    );
};

export default AddressForm;
