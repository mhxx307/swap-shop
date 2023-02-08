import { IconType } from 'react-icons/lib';

export interface PopupMenuItemProps {
    icon?: IconType;
    label: string;
    path?: string;
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

export interface ArticleProps {
    id: string;
}
