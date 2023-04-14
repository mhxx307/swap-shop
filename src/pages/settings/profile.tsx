import { useForm } from 'react-hook-form';
import { ReactNode } from 'react';

import { SettingsLayout } from '@/components/layouts';
import { Button, InputField } from '@/components/shared';
import { AvatarUpload } from '@/components/features/uploads';
import {
    UpdateProfileInput,
    useMeQuery,
    useUpdateProfileMutation,
} from '@/generated/graphql';
import { toast } from 'react-toastify';
// import { useAuthContext } from '@/contexts/AuthContext';

const ProfilePage = () => {
    // const { profile } = useAuthContext();
    const { data } = useMeQuery();
    const profile = data?.me;
    const { control, handleSubmit } = useForm<UpdateProfileInput>({
        defaultValues: {
            username: profile?.username,
            address: profile?.address || '',
            phoneNumber: profile?.phoneNumber || '',
            fullName: profile?.fullName,
            birthday: profile?.birthday || '',
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

    if (!profile) {
        return <div>No authen</div>;
    }

    return (
        <div className="space-y-12 pb-[60px]">
            <AvatarUpload picture={profile?.avatar} />

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

                <p>{profile.email}</p>

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
                    secondary
                    isLoading={loading}
                    className="border-[2px] border-transparent font-semibold"
                    type="submit"
                >
                    Save
                </Button>
            </form>
        </div>
    );
};

export default ProfilePage;

// eslint-disable-next-line react/display-name
ProfilePage.Layout = (page: ReactNode) => (
    <SettingsLayout>{page}</SettingsLayout>
);
