import { path } from '@/constants';
import { storage } from '@/libs/firebase';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import mime from 'mime';
import { v4 } from 'uuid';

export const randomElement = <T>(array: T[]): T => {
    const index = Math.floor(Math.random() * array.length);

    return array[index];
};

export const randomElementList = <T>(array: T[], length: number): T[] => {
    const randomArr: T[] = [];

    for (let i = 0; i < length; i++) {
        randomArr.push(randomElement(array));
    }

    return randomArr;
};

// https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
export const humanFileSize = (size: number) => {
    if (size === 0) return '0 KB';

    const i = Math.floor(Math.log(size) / Math.log(1024));

    const convertedNumber = Number((size / Math.pow(1024, i)).toFixed(2));
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const unit = units[i];

    return `${convertedNumber} ${unit}`;
};

// https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id
export const randomString = (length: number) => {
    const chars =
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split(
            '',
        );

    if (!length) {
        length = Math.floor(Math.random() * chars.length);
    }

    let str = '';

    for (let i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
};

export const createFileFromUrl = async (url: string, filename: string) => {
    const { data } = await axios.get<Blob>(url, { responseType: 'blob' });

    const extension = url.split('.').pop();

    const metadata = {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        type: mime.getType(extension!) || 'text/plain',
    };

    const file = new File([data], filename, metadata);

    return file;
};

export function formatCurrency(value: number) {
    return new Intl.NumberFormat('de-DE').format(value);
}

export function formatNumberToSocialStyle(value: number) {
    return new Intl.NumberFormat('en', {
        notation: 'compact',
        maximumFractionDigits: 1,
    })
        .format(value)
        .replace('.', ',')
        .toLowerCase();
}

export const removeSpecialCharacter = (str: string) =>
    str.replace(
        // eslint-disable-next-line no-useless-escape
        /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        ' ',
    );

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
    return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i,${id}`;
};

export const getIdFromNameId = (nameId: string) => {
    const arr = nameId.split('-i,');
    return arr[arr.length - 1];
};

export const getNameFromNameId = (nameId: string) => {
    const arr = nameId.split('-i,');
    return arr[0];
};

export const uploadMultipleImages = (files: File[]) => {
    for (const file of files) {
        const fileRef = ref(storage, `articles/${file.name + v4()}`);
        uploadBytes(fileRef, file);
    }
};

export const getTextColorByPath = (pathname: string) => {
    return pathname !== path.home ? 'text-white' : '';
};

export const createAttachmentUrl = (url: string, folderName: string) => {
    return `${folderName}/${url.split('%2F')[1].split('?')[0]}`;
};

export const createUrlListFromFileList = async (
    files: File[],
    folderName: string,
) => {
    const urlList: string[] = [];
    for (const file of files) {
        const fileRef = ref(storage, `${folderName}/${file.name + v4()}`);
        const upload = await uploadBytes(fileRef, file);
        const url = await getDownloadURL(upload.ref);
        urlList.push(url);
    }
    return urlList;
};
