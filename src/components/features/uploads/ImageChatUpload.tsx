import BaseButton from '@/components/shared/BaseButton';
import Button from '@/components/shared/Button';
import FileUploading, {
    FileChatUploader,
    FileUploadingProps,
} from '@/components/shared/FileUploading';
import Image from '@/components/shared/Image';
import { supportedUploadImageFormats } from '@/constants';
import { randomString } from '@/utils';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

interface ImageChatUploadProps extends FileUploadingProps {
    onChange?: (images: File[]) => void;
}

const ImageChatUpload: React.FC<ImageChatUploadProps> = ({
    onChange,
    ...props
}) => {
    const handleFileChange = (fileList: File[]) => {
        onChange?.(fileList);
    };

    return (
        <FileUploading
            onChange={handleFileChange}
            acceptType={supportedUploadImageFormats}
            multiple
            {...props}
        >
            {(props) => {
                if (!props.fileList?.length)
                    return <FileChatUploader {...props} />;

                return (
                    <div className="bg-background-900 absolute bottom-14 grid grid-cols-4 gap-4 p-3">
                        {props.fileList.map((file, index) => {
                            const key = randomString(8);

                            const imageSrc = URL.createObjectURL(file);

                            return (
                                <div key={key} className="relative col-span-1">
                                    <div className="aspect-[4/2] ">
                                        <Image
                                            src={imageSrc}
                                            alt={file.name}
                                            className="h-[100px]  object-cover"
                                        />
                                    </div>

                                    <div className="bg-background-800 absolute top-0 right-0 flex items-center">
                                        <Button
                                            secondary
                                            onClick={() =>
                                                props.onFileUpdate(index)
                                            }
                                            LeftIcon={AiOutlineEdit}
                                            iconClassName="w-6 h-6"
                                            className="!p-1"
                                        />

                                        <Button
                                            secondary
                                            onClick={() =>
                                                props.onFileRemove(index)
                                            }
                                            LeftIcon={AiOutlineDelete}
                                            iconClassName="text-red-500 w-6 h-6"
                                            className="!p-1"
                                        />
                                    </div>
                                </div>
                            );
                        })}

                        <BaseButton
                            onClick={props.onFileUpload}
                            className="aspect-w-9 aspect-h-14 relative col-span-1 border border-dashed border-gray-300 bg-transparent hover:border-white"
                            iconClassName="w-16 h-16 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                        />
                    </div>
                );
            }}
        </FileUploading>
    );
};

export default ImageChatUpload;
