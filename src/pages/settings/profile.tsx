import { useForm } from 'react-hook-form';
import { SettingsLayout } from '@/components/layouts';
import { Auth, Button, DateField, InputField } from '@/components/shared';
import { useMeQuery } from '@/types/generated/graphql';
import { AvatarUpload } from '@/components/features/uploads';

const ProfilePage = () => {
    const { data } = useMeQuery();
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
                <AvatarUpload picture={data?.me?.avatar!} />

                <form
                    method="POST"
                    onSubmit={handleSubmit(handleUpdate)}
                    className="space-y-8"
                >
                    <InputField
                        name="username"
                        control={control}
                        autoFocus
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

                    <DateField
                        name="birthday"
                        control={control}
                        placeholder={data?.me?.birthday!}
                    />

                    <Button
                        primary
                        className="font-semibold border-[2px] border-transparent"
                    >
                        Save
                    </Button>
                </form>
            </div>
        </Auth>
    );
};

// eslint-disable-next-line react/display-name
ProfilePage.Layout = (page: any) => <SettingsLayout>{page}</SettingsLayout>;

export default ProfilePage;
