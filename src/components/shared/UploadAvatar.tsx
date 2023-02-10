import { AiFillCamera } from 'react-icons/ai';
import { useEffect, useRef, useState } from 'react';
import Image from './Image';

export interface UploadAvatarProps {
    picture?: string;
}

const UploadAvatar = ({ picture }: UploadAvatarProps) => {
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

    return (
        <div className="flex items-center">
            <div className="flex-shrink-0">
                <Image
                    src={
                        preview
                            ? preview
                            : picture
                            ? picture
                            : 'images/avatar-fallback.png'
                    }
                    alt="Avatar"
                    className="rounded-full w-[128px] h-[128px] object-cover border-[4px] border-white shadow-2xl"
                />
                <label
                    htmlFor="avatar"
                    className="absolute flex-center w-12 h-12 bg-[#ecedf1] border-2 border-white dark:border-gray-800 rounded-full cursor-pointer hover:opacity-80 transition-opacity ml-[70px] -mt-[35px]"
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
            {/* <button>Remove</button> */}
        </div>
    );
};

export default UploadAvatar;
