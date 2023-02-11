import { useForm } from 'react-hook-form';
import { SettingsLayout } from '@/components/layouts';
import { Auth, Button, InputField, UploadAvatar } from '@/components/shared';

const ProfilePage = () => {
    const { control, handleSubmit } = useForm<any>({
        defaultValues: {
            username: 'minhquan',
            address: 'Dong Thap',
            email: 'minhquan@gmail.com',
            phone: '0123456789',
        },
    });

    const handleUpdate = (payload: any) => {
        console.log(payload);
    };

    const profile = {
        pic: 'https://www.adobe.com/express/feature/image/media_16ad2258cac6171d66942b13b8cd4839f0b6be6f3.png?width=750&format=png&optimize=medium',
    };

    return (
        <Auth>
            <div className="space-y-12 pb-[60px]">
                <UploadAvatar picture={profile.pic} />

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
                        name="phone"
                        control={control}
                        label="Your phone number"
                        containerInputClassName="default-input"
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
