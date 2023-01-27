import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillCamera } from 'react-icons/ai';
import { SettingsLayout } from '@/components/layouts';
import { Button, Image, InputField } from '@/components/shared';

const ProfilePage = () => {
    const { control, handleSubmit } = useForm<any>({
        defaultValues: {
            username: 'minhquan',
            address: 'Dong Thap',
            email: 'minhquan@gmail.com',
            phone: '0123456789',
        },
    });

    const [selectedFile, setSelectedFile] = useState<File | null>();
    const [preview, setPreview] = useState<string>();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onSelectFile = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        setSelectedFile(e.target.files[0]);
    };

    const handleUpdate = (payload: any) => {
        console.log(payload);
    };

    const profile = {
        pic: 'https://www.adobe.com/express/feature/image/media_16ad2258cac6171d66942b13b8cd4839f0b6be6f3.png?width=750&format=png&optimize=medium',
    };

    return (
        <div className="space-y-12 pb-[60px]">
            <div className="flex items-center relative">
                <div className="relative">
                    <Image
                        src={
                            preview ? preview : profile?.pic ? profile?.pic : ''
                        }
                        alt="Avatar"
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
                        accept="image/*"
                        hidden
                        ref={fileInputRef}
                        id="avatar"
                        onChange={onSelectFile}
                    />
                </div>

                {selectedFile && (
                    <div>
                        <button>Save</button>
                        <button
                            onClick={() => {
                                setSelectedFile(null);
                                setPreview('');
                                fileInputRef.current!.value = '';
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                )}
                <button>Remove</button>
            </div>

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
    );
};

// eslint-disable-next-line react/display-name
ProfilePage.Layout = (page: any) => <SettingsLayout>{page}</SettingsLayout>;

export default ProfilePage;
