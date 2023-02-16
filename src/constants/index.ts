import { ProgressItemProps, RegisterPayload } from '@/types';
import { FieldError } from '@/types/generated/graphql';

export const REVALIDATE_TIME = 86_400; // 24 hours

export const REGISTER_INITIAL_DATA: RegisterPayload = {
    fullName: '',
    date: null,
    address: '',
    email: '',
    username: '',
    password: '',
    phoneNumber: '',
    confirmPassword: '',
};

export const PROGRESS_LIST: ProgressItemProps[] = [
    {
        title: 'Account',
        number: 0,
    },
    {
        title: 'User',
        number: 1,
    },
    {
        title: 'Address',
        number: 2,
    },
];

export const BANNER_IMAGE_LIST = [
    'https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1713&q=80',
    'https://images.unsplash.com/photo-1509281373149-e957c6296406?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmludGFnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1484396196377-1ca16c878cb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHZpbnRhZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
];

export const FACEBOOK_URL = 'https://www.facebook.com';
export const YOUTUBE_URL = 'https://www.youtube.com';
export const WEBSITE_URL = 'swap-shop-jq6a2utdi-mhxx307.vercel.app';

export const supportedUploadImageFormats = ['jpg', 'jpeg', 'png'];
