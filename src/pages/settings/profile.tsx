import { useForm } from 'react-hook-form';
import { ReactNode } from 'react';

import { SettingsLayout } from '@/components/layouts';
import { Auth, Button, InputField } from '@/components/shared';
import { AvatarUpload } from '@/components/features/uploads';
import { useMeQuery } from '@/generated/graphql';

const ProfilePage = () => {
    const { data: meData } = useMeQuery();
    const me = meData?.me;
    const { control, handleSubmit } = useForm<any>({
        defaultValues: {
            username: me?.username,
            address: me?.address,
            email: me?.email,
            phoneNumber: me?.phoneNumber,
            fullName: me?.fullName,
            birthday: me?.birthday,
        },
    });

    const handleUpdate = (payload: any) => {
        console.log(payload);
    };

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
