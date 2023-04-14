import { AiFillCamera } from 'react-icons/ai';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Image } from '@/components/shared';
import { storage } from '@/libs/firebase';
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes,
} from 'firebase/storage';
import { v4 } from 'uuid';
import { toast } from 'react-toastify';
import { User, useUploadAvatarProfileMutation } from '@/generated/graphql';
import { createAttachmentUrl } from '@/utils';
import { useAuthContext } from '@/contexts/AuthContext';

export interface AvatarUploadProps {
    picture?: string | null;
}

const AvatarUpload = ({ picture }: AvatarUploadProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>();
    const [preview, setPreview] = useState<string>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { setProfile } = useAuthContext();

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

    const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        setSelectedFile(e.target.files[0]);
    };

    const [uploadAvatarProfileMutation] = useUploadAvatarProfileMutation();

    const upLoadImageProfile = async () => {
        if (selectedFile === undefined || selectedFile === null) return;
        const imageRef = ref(storage, `profiles/${selectedFile?.name + v4()}`);

        if (picture) {
            const oldImageRef = ref(
                storage,
                createAttachmentUrl(picture, 'profiles'),
            );
            await deleteObject(oldImageRef);
        }

        const response = await uploadBytes(imageRef, selectedFile);
        const url = await getDownloadURL(response.ref);
        await uploadAvatarProfileMutation({
            variables: { imageUrl: url },
            onCompleted: (data) => {
                setProfile(data.uploadAvatarProfile.user as User);
                toast.success('Uploaded successfully');
            },
        });
    };

    return (
        <div className="flex items-center">
            <div className="flex-shrink-0">
                <Image
                    src={
                        preview
                            ? preview
                            : picture
                            ? picture
                            : '/images/avatar-fallback.png'
                    }
                    alt="Avatar"
                    className="h-[128px] w-[128px] rounded-full border-[4px] border-white object-cover shadow-2xl"
                />
                <label
                    htmlFor="avatar"
                    className="flex-center absolute ml-[70px] -mt-[35px] h-12 w-12 cursor-pointer rounded-full border-2 border-white bg-[#ecedf1] transition-opacity hover:opacity-80 dark:border-gray-800"
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
                    <button onClick={upLoadImageProfile}>Save</button>
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
            {/* <button>Remove</button> */}
        </div>
    );
};

export default AvatarUpload;
