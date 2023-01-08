import { IconType } from 'react-icons/lib';

export interface NavListProps {
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

export interface LoginPayload {
    username: string;
    password: string;
}

export interface RegisterPayload {
    firstName: string;
    lastName: string;
    age: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    email: string;
    password: string;
}

export interface ProgressItemProps {
    title: string;
    number: number;
}
