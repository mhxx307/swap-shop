import { IconType } from 'react-icons/lib';

export interface HeaderNavListProps {
    path: string;
    label: string;
}

export interface PopupMenuItemProps {
    icon?: IconType;
    title: string;
    to?: string;
    children?: any;
    separate?: boolean;
}
