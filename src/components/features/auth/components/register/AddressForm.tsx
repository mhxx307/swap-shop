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
        <FormWrapper title="Address" description="Address">
            <Autocomplete key={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}>
                <InputField
                    autoFocus
                    label="Your address:"
                    type="text"
                    name="address"
                    required
                    control={control}
                    containerInputClassName="default-input shadow-none"
                    placeholder="Enter your address"
                />
            </Autocomplete>
        </FormWrapper>
    );
};

export default AddressForm;
