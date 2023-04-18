import classNames from 'classnames';
import { useState } from 'react';
import ReactFileUploading, {
    FileUploadingPropsType,
} from 'react-files-uploading';
import { ExportInterface } from 'react-files-uploading/dist/typings';
import {
    AiFillFileAdd,
    AiOutlineCloudUpload,
    AiOutlineDelete,
    AiOutlineEdit,
    AiOutlineFile,
} from 'react-icons/ai';
import BaseButton from './BaseButton';
import Button from './Button';
import { humanFileSize } from '@/utils';
import { BsCardImage } from 'react-icons/bs';

export interface FileUploadingProps extends Partial<FileUploadingPropsType> {
    initialFiles: File[];
}

interface FileUploadingUIProps extends ExportInterface {
    multiple?: boolean;
}

interface FileBoxProps {
    file: {
        name: string;
        size: number;
    };
    index: number;
    onFileRemove?: (index: number) => void;
    onFileUpdate?: (index: number) => void;
}

export const FileBox: React.FC<FileBoxProps> = ({
    file,
    onFileRemove,
    onFileUpdate,
    index,
}) => (
    <div className="bg-background-900 relative flex h-40 w-40 items-end rounded-md p-2">
        <AiOutlineFile className="absolute left-1/2 top-1/2 h-16 w-16 -translate-y-1/2 -translate-x-1/2" />

        <p className="text-sm line-clamp-1">{file.name}</p>

        <p className="absolute top-2 left-2">{humanFileSize(file.size)}</p>

        <div className="bg-background-800 absolute -top-2 -right-2 flex items-center">
            {onFileUpdate && (
                <Button
                    secondary
                    onClick={() => onFileUpdate(index)}
                    LeftIcon={AiOutlineEdit}
                    iconClassName="w-6 h-6"
                    className="!p-1"
                />
            )}

            {onFileRemove && (
                <Button
                    secondary
                    onClick={() => onFileRemove(index)}
                    LeftIcon={AiOutlineDelete}
                    iconClassName="text-red-500 w-6 h-6"
                    className="!p-1"
                />
            )}
        </div>
    </div>
);

export const FileUploader: React.FC<ExportInterface> = ({
    isDragging,
    dragProps,
    onFileUpload,
}) => {
    return (
        <div
            className={classNames(
                'flex w-full flex-col items-center justify-center rounded-md border border-dashed border-white/60 p-4 transition duration-300',
                isDragging ? 'bg-white/20' : 'bg-background-900',
            )}
            {...dragProps}
        >
            <AiOutlineCloudUpload className="h-24 w-24 text-gray-300" />

            <p className="text-gray-300">
                Drag and drop or
                <button
                    className="text-primary-300 hover:underline"
                    onClick={onFileUpload}
                    type="button"
                >
                    Upload
                </button>{' '}
            </p>
        </div>
    );
};

export const FileChatUploader: React.FC<ExportInterface> = ({
    isDragging,
    dragProps,
    onFileUpload,
}) => {
    return (
        <div
            className={classNames(
                'flex flex-col items-center justify-center p-4 transition duration-300',
                isDragging ? 'bg-white/20' : 'bg-background-900',
            )}
            {...dragProps}
        >
            <BsCardImage
                className="cursor-pointer text-black"
                onClick={onFileUpload}
            />
        </div>
    );
};

export const FileUploadedList: React.FC<FileUploadingUIProps> = ({
    fileList,
    onFileRemove,
    onFileUpdate,
    multiple,
    onFileUpload,
}) => {
    return (
        <div className="flex flex-wrap items-center gap-4">
            {fileList.map((file, index) => (
                <FileBox
                    file={file}
                    index={index}
                    onFileRemove={onFileRemove}
                    onFileUpdate={onFileUpdate}
                    key={`file-${index}`}
                />
            ))}

            {multiple && (
                <BaseButton
                    LeftIcon={AiFillFileAdd}
                    onClick={onFileUpload}
                    className="flex h-40 w-40 items-center justify-center border border-dashed border-gray-300 bg-transparent hover:border-white"
                    iconClassName="w-16 h-16"
                />
            )}
        </div>
    );
};

const FileUploadingUI: React.FC<FileUploadingUIProps> = (props) => {
    if (props.fileList.length === 0) {
        return <FileUploader {...props} />;
    }

    return <FileUploadedList {...props} />;
};

const FileUploading: React.FC<FileUploadingProps> = ({
    initialFiles,
    children,
    onChange,
    ...props
}) => {
    const [files, setFiles] = useState<File[]>(initialFiles);

    const handleChange = (
        fileList: File[],
        addUpdatedIndex?: Array<number>,
    ) => {
        setFiles(fileList);
        onChange?.(fileList, addUpdatedIndex);
    };

    return (
        <ReactFileUploading value={files} onChange={handleChange} {...props}>
            {(exportProps) =>
                children?.(exportProps) || (
                    <FileUploadingUI
                        {...exportProps}
                        multiple={props.multiple}
                    />
                )
            }
        </ReactFileUploading>
    );
};

export default FileUploading;
