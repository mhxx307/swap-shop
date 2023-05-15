import { useForm } from 'react-hook-form';
import { ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { SettingsLayout } from '@/components/layouts';
import { Button, InputField } from '@/components/shared';
import {
    ChangePasswordInput,
    useChangePasswordLoggedMutation,
} from '@/generated/graphql';
import omit from 'lodash/omit';

interface FormState extends ChangePasswordInput {
    oldPassword: string;
    confirmNewPassword: string;
}

const PasswordPage = () => {
    const { control, handleSubmit } = useForm<FormState>({
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

    const handleChangePassword = async (payload: FormState) => {
        const changePasswordInput = omit(payload, 'confirmNewPassword');
        await changePassword({
            variables: {
                changePasswordLoggedInput: changePasswordInput,
            },
        });
    };

    useEffect(() => {
        if (!loading && data?.changePasswordLogged.success) {
            toast.success('Change password successfully', {
                toastId: 'success',
            });
        }

        if (!loading && !data?.changePasswordLogged.success) {
            toast.error(data?.changePasswordLogged.message, {
                toastId: 'error',
            });
        }
    }, [data, loading]);

    return (
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
                    placeholder="Enter your old password"
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
                    placeholder="Enter your new password"
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
                    placeholder="Confirm your new password"
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
                    className="border-[2px] border-transparent text-right font-semibold"
                    isLoading={loading}
                >
                    Save
                </Button>
            </form>
        </div>
    );
};

export default PasswordPage;

// eslint-disable-next-line react/display-name
PasswordPage.Layout = (page: ReactNode) => (
    <SettingsLayout>{page}</SettingsLayout>
);
