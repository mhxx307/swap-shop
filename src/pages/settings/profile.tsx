import { SettingsLayout } from '@/components/layouts';
import { Button, Image, InputField } from '@/components/shared';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillCamera } from 'react-icons/ai';

const ProfilePage = () => {
    const { control, handleSubmit } = useForm<any>({
        defaultValues: {
            username: 'minhquan',
            address: 'Dong Thap',
            email: 'minhquan@gmail.com',
            phone: '0123456789',
        },
    });

    const [avatar, setAvatar] = useState<string | null>(null);
    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar);
        };
    }, [avatar]);

    const onFileChange = (e: any) => {
        if (e.target.files.length !== 0) {
            const preview = URL.createObjectURL(e.target.files[0]);
            preview && setAvatar(preview);
        }
    };

    const handleUpdate = (payload: any) => {
        console.log(payload);
    };

    return (
        <div className="space-y-12 pb-[60px]">
            <div className="flex items-center relative">
                <div className="relative">
                    <Image
                        src={
                            avatar
                                ? avatar
                                : 'https://www.adobe.com/express/feature/image/media_16ad2258cac6171d66942b13b8cd4839f0b6be6f3.png?width=750&format=png&optimize=medium'
                            // after: user.avatar
                        }
                        alt="dog avatar"
                        className="rounded-[50%] w-[128px] h-[128px] object-cover border-[4px] border-white shadow-2xl ss:mx-[24px]"
                    />
                    <label
                        htmlFor="avatar"
                        className="bottom-0 right-[20%] absolute w-12 h-12 bg-[#ecedf1] border-2 border-white dark:border-gray-800 rounded-full cursor-pointer flex-center hover:opacity-80 transition-opacity"
                    >
                        <AiFillCamera className="text-black" />
                    </label>
                    <input
                        type="file"
                        hidden
                        id="avatar"
                        onChange={onFileChange}
                    />
                </div>

                <button>Remove</button>
            </div>
            <div>
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
                        containerInputClassName="register-input"
                    />

                    <InputField
                        name="address"
                        control={control}
                        label="Address"
                        containerInputClassName="register-input"
                    />

                    <InputField
                        name="email"
                        control={control}
                        label="Email"
                        containerInputClassName="register-input"
                    />

                    <InputField
                        name="phone"
                        control={control}
                        label="Your phone number"
                        containerInputClassName="register-input"
                    />

                    <Button
                        primary
                        className="font-semibold border-[2px] border-transparent"
                    >
                        Save
                    </Button>
                </form>
            </div>
        </div>
    );
};

// eslint-disable-next-line react/display-name
ProfilePage.Layout = (page: any) => <SettingsLayout>{page}</SettingsLayout>;

export default ProfilePage;
