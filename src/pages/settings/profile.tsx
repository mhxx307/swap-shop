import { useForm, Controller } from 'react-hook-form';
import { ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';

import { SettingsLayout } from '@/components/layouts';
import { Button, DateSelect, InputField } from '@/components/shared';
import { AvatarUpload } from '@/components/features/uploads';
import { useMeQuery, useUpdateProfileMutation } from '@/generated/graphql';
import { Schema, schema } from '@/constants/schema';
import { yupResolver } from '@hookform/resolvers/yup';

type FormState = Pick<
    Schema,
    'username' | 'address' | 'phoneNumber' | 'fullName' | 'birthday'
>;

const profileSchema = schema.pick([
    'username',
    'phoneNumber',
    'address',
    'birthday',
    'fullName',
]);

const ProfilePage = () => {
    const { data } = useMeQuery();
    const profile = data?.me;
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormState>({
        defaultValues: {
            username: '',
            address: '',
            phoneNumber: '',
            fullName: '',
            birthday: new Date(1990, 0, 1),
        },
        resolver: yupResolver(profileSchema),
    });

    const [profileMutation, { loading }] = useUpdateProfileMutation();
    const handleUpdate = async (payload: FormState) => {
        console.log(payload);
        await profileMutation({
            variables: {
                updateProfileInput: {
                    ...payload,
                    birthday: payload.birthday?.toString(),
                },
            },
        });
        toast.success('Update Sucessfully', { toastId: 'updatedProfile' });
    };

    useEffect(() => {
        if (profile) {
            setValue('username', profile.username);
            setValue('address', profile.address || '');
            setValue('phoneNumber', profile.phoneNumber || '');
            setValue('fullName', profile.fullName);
            setValue(
                'birthday',
                profile.birthday
                    ? new Date(profile.birthday)
                    : new Date(1990, 0, 1),
            );
        }
    }, [profile, setValue]);

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

                <Controller
                    name="birthday"
                    control={control}
                    render={({ field }) => (
                        <DateSelect
                            value={field.value}
                            onChange={field.onChange}
                            errorMessage={errors.birthday?.message}
                        />
                    )}
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
