import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { SettingsLayout } from '@/components/layouts';
import { Button, InputField } from '@/components/shared';

export interface IPasswordPageProps {}

const PasswordPage = (props: IPasswordPageProps) => {
    const { control, handleSubmit } = useForm<any>({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
        },
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleUpdate = (payload: any) => {
        console.log(payload);
    };

    return (
        <div className="space-y-20">
            <h3 className="text-4xl">Password</h3>
            <form
                method="POST"
                onSubmit={handleSubmit(handleUpdate)}
                className="space-y-12"
            >
                <InputField
                    type={showPassword ? 'text' : 'password'}
                    name="oldPassword"
                    control={control}
                    className="px-3 py-2"
                    containerclassname="mt-[12px]"
                    label="Old password"
                    iconClassName="w-8 h-8 cursor-pointer hover:text-gray-500"
                    rightIconOnClick={() => setShowPassword(!showPassword)}
                    RightIcon={showPassword ? FaEye : FaEyeSlash}
                />

                <InputField
                    type={showPassword ? 'text' : 'password'}
                    name="newPassword"
                    control={control}
                    className="px-3 py-2"
                    containerclassname="mt-[12px]"
                    label="New password"
                    iconClassName="w-8 h-8 cursor-pointer hover:text-gray-500"
                    rightIconOnClick={() => setShowPassword(!showPassword)}
                    RightIcon={showPassword ? FaEye : FaEyeSlash}
                />

                <Button
                    primary
                    className="text-right font-semibold border-[2px] border-transparent"
                >
                    Save
                </Button>
            </form>
        </div>
    );
};

// eslint-disable-next-line react/display-name
PasswordPage.Layout = (page: any) => <SettingsLayout>{page}</SettingsLayout>;

export default PasswordPage;
