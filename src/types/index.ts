import { ReactNode } from 'react';
import { IconType } from 'react-icons/lib';

export interface PopupMenuItemProps {
    icon?: IconType;
    label: string;
    path: string;
    children?: ReactNode;
    separate?: boolean;
}

export interface NavItemProps {
    label: string;
    path: string;
}

export interface ProgressItemProps {
    title: string;
    number: number;
}
