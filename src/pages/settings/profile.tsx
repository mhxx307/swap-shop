import { useForm } from 'react-hook-form';
import { ReactNode } from 'react';

import { SettingsLayout } from '@/components/layouts';
import { Auth, Button, InputField } from '@/components/shared';
import { AvatarUpload } from '@/components/features/uploads';
import { useCheckAuth } from '@/hooks';
import {
    useUpdateProfileMutation,
    UpdateProfileInput,
} from '@/generated/graphql';
import { toast } from 'react-toastify';

const ProfilePage = () => {
    const { data } = useCheckAuth();
    const { control, handleSubmit } = useForm<UpdateProfileInput>({
        defaultValues: {
            username: data?.me?.username,
            address: data?.me?.address,
            phoneNumber: data?.me?.phoneNumber,
            fullName: data?.me?.fullName,
            birthday: data?.me?.birthday,
        },
    });

    const [profileMutation, { loading }] = useUpdateProfileMutation();
    //*! chua cap nhat cache
    const handleUpdate = async (payload: UpdateProfileInput) => {
        console.log(payload);
        await profileMutation({
            variables: {
                updateProfileInput: payload,
            },
        });
        toast.success('Update Sucessfully', { toastId: 'updatedProfile' });
    };

    return (
        <Auth>
            <div className="space-y-12 pb-[60px]">
                <AvatarUpload picture={data?.me?.avatar} />

                <form
                    method="POST"
                    onSubmit={handleSubmit(handleUpdate)}
                    className="space-y-8"
                >
                    <InputField
                        name="username"
                        control={control}
                        label="Username"
                        containerInputClassName="default-input"
                    />

                    <InputField
                        name="address"
                        control={control}
                        label="Address"
                        containerInputClassName="default-input"
                    />

                    <p>{data?.me?.email}</p>

                    <InputField
                        name="phoneNumber"
                        control={control}
                        label="Phone number"
                        containerInputClassName="default-input"
                    />

                    <InputField
                        name="fullName"
                        control={control}
                        label="Full name"
                        containerInputClassName="default-input"
                    />

                    <InputField
                        name="birthday"
                        control={control}
                        label="Birthday"
                        containerInputClassName="default-input"
                        type="date"
                    />

                    <Button
                        primary
                        isLoading={loading}
                        className="border-[2px] border-transparent font-semibold"
                        type="submit"
                    >
                        Save
                    </Button>
                </form>
            </div>
        </Auth>
    );
};

export default ProfilePage;

// eslint-disable-next-line react/display-name
ProfilePage.Layout = (page: ReactNode) => (
    <SettingsLayout>{page}</SettingsLayout>
);
