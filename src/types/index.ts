import { IconType } from 'react-icons/lib';
import { ChangePasswordLoggedInput } from './generated/graphql';

export interface PopupMenuItemProps {
    icon?: IconType;
    label: string;
    path?: string;
    children?: any;
    separate?: boolean;
}

export interface RegisterPayload {
    fullName: string;
    email: string;
    username: string;
    password: string;
    address: string;
    phoneNumber: string;
    confirmPassword: string;
    date?: any;
}

export interface ChangePasswordPayload {
    password: string;
    confirmPassword: string;
}

export interface ChangePasswordLoggedPayload extends ChangePasswordLoggedInput {
    confirmNewPassword: string;
}

export interface ProgressItemProps {
    title: string;
    number: number;
}

export interface ArticleProps {
    id: string;
}
