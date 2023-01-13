import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';

import { FormWrapper, InputField } from '@/components/shared';
import { FormProps } from './AccountForm';

const AddressForm = ({ control }: FormProps) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
        libraries: ['places'],
    });

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <FormWrapper title="Address" description="Enter your address">
            <Autocomplete>
                <InputField
                    autoFocus
                    label="Street"
                    type="text"
                    name="street"
                    control={control}
                    containerInputClassName="register-input shadow-none"
                    placeholder="Enter your address"
                />
            </Autocomplete>
        </FormWrapper>
    );
};

export default AddressForm;
