import { useForm } from 'react-hook-form';
import { ReactNode } from 'react';

import { SettingsLayout } from '@/components/layouts';
import { Auth, Button, InputField } from '@/components/shared';
import { AvatarUpload } from '@/components/features/uploads';
import { useCheckAuth } from '@/hooks';

const ProfilePage = () => {
    const { data } = useCheckAuth();
    const { control, handleSubmit } = useForm<any>({
        defaultValues: {
            username: data?.me?.username,
            address: data?.me?.address,
            email: data?.me?.email,
            phoneNumber: data?.me?.phoneNumber,
            fullName: data?.me?.fullName,
            birthday: data?.me?.birthday,
        },
    });

    const handleUpdate = (payload: any) => {
        console.log(payload);
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

                    <InputField
                        name="email"
                        control={control}
                        label="Email"
                        containerInputClassName="default-input"
                    />

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
                    />

                    <Button
                        primary
                        className="border-[2px] border-transparent font-semibold"
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
