import { IconType } from 'react-icons/lib';

export interface PopupMenuItemProps {
    icon?: IconType;
    label: string;
    path?: string;
    children?: any;
    separate?: boolean;
}
export interface ProgressItemProps {
    title: string;
    number: number;
}

