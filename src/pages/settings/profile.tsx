import { useForm } from 'react-hook-form';
import { ReactNode } from 'react';

import { SettingsLayout } from '@/components/layouts';
import { Auth, Button, InputField } from '@/components/shared';
import { AvatarUpload } from '@/components/features/uploads';
import {
    UpdateProfileInput,
    useMeQuery,
    useUpdateProfileMutation,
} from '@/generated/graphql';
import { toast } from 'react-toastify';

const ProfilePage = () => {
    const { data: meData, error, loading: meLoading } = useMeQuery();
    const me = meData?.me;
    const { control, handleSubmit } = useForm<UpdateProfileInput>({
        defaultValues: {
            username: me?.username,
            address: me?.address,
            phoneNumber: me?.phoneNumber,
            fullName: me?.fullName,
            birthday: me?.birthday,
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

    if (!me) return <h1>Loading...</h1>;

    if (meLoading) return <h3>Loading ....</h3>;

    if (error)
        return <h3 style={{ color: 'red' }}>Error: {JSON.stringify(error)}</h3>;

    return (
        <Auth>
            <div className="space-y-12 pb-[60px]">
                <AvatarUpload picture={me?.avatar} />

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

                    <p>{me?.email}</p>

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
