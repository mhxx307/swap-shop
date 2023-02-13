import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { SettingsLayout } from '@/components/layouts';
import { Auth, Button, InputField } from '@/components/shared';
import { ChangePasswordLoggedPayload } from '@/types';
import { useChangePasswordLoggedMutation } from '@/types/generated/graphql';

const PasswordPage = () => {
    const { control, handleSubmit } = useForm<ChangePasswordLoggedPayload>({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
    });

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const [changePassword, { data, loading }] =
        useChangePasswordLoggedMutation();

    const handleChangePassword = async (
        payload: ChangePasswordLoggedPayload,
    ) => {
        console.log(payload);
        const { oldPassword, newPassword } = payload;
        if (oldPassword && newPassword) {
            const response = await changePassword({
                variables: {
                    changePasswordLoggedInput: { oldPassword, newPassword },
                },
            });

            console.log(response);
        }
    };

    useEffect(() => {
        if (!loading && data?.changePasswordLogged.success) {
            toast.success('Change password successfully', {
                toastId: 'success',
            });
        }

        if (!loading && !data?.changePasswordLogged.success) {
            toast.error(data?.changePasswordLogged.message, {
                toastId: data?.changePasswordLogged.message!,
            });
        }
    }, [data, loading]);

    return (
        <Auth>
            <div className="space-y-14">
                <h3 className="text-4xl">Password</h3>
                <form
                    className="space-y-12 pb-4"
                    method="POST"
                    onSubmit={handleSubmit(handleChangePassword)}
                >
                    <InputField
                        type={showOldPassword ? 'text' : 'password'}
                        name="oldPassword"
                        placeholder="........"
                        control={control}
                        className="px-3 py-2"
                        label="Old password"
                        iconClassName="w-5 h-5 cursor-pointer hover:text-gray-500"
                        rightIconOnClick={() =>
                            setShowOldPassword(!showOldPassword)
                        }
                        RightIcon={showOldPassword ? FaEye : FaEyeSlash}
                    />

                    <InputField
                        type={showNewPassword ? 'text' : 'password'}
                        name="newPassword"
                        placeholder="........"
                        control={control}
                        className="px-3 py-2"
                        label="New password"
                        iconClassName="w-5 h-5 cursor-pointer hover:text-gray-500"
                        rightIconOnClick={() =>
                            setShowNewPassword(!showNewPassword)
                        }
                        RightIcon={showNewPassword ? FaEye : FaEyeSlash}
                    />

                    <InputField
                        type={showConfirmNewPassword ? 'text' : 'password'}
                        name="confirmNewPassword"
                        placeholder="........"
                        control={control}
                        className="px-3 py-2"
                        label="Confirm new password"
                        iconClassName="w-5 h-5 cursor-pointer hover:text-gray-500"
                        rightIconOnClick={() =>
                            setShowConfirmNewPassword(!showConfirmNewPassword)
                        }
                        RightIcon={showConfirmNewPassword ? FaEye : FaEyeSlash}
                    />

                    <Button
                        primary
                        type="submit"
                        className="text-right font-semibold border-[2px] border-transparent"
                        isLoading={loading}
                    >
                        Save
                    </Button>
                </form>
            </div>
        </Auth>
    );
};

// eslint-disable-next-line react/display-name
PasswordPage.Layout = (page: any) => <SettingsLayout>{page}</SettingsLayout>;

export default PasswordPage;
