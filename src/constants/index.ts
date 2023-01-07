import { ProgressItemProps, RegisterPayload } from '@/types';

export const REVALIDATE_TIME = 86_400; // 24 hours

export const REGISTER_INITIAL_DATA: RegisterPayload = {
    firstName: '',
    lastName: '',
    age: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    password: '',
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

export const FACEBOOK_URL = 'https://www.facebook.com';
export const YOUTUBE_URL = 'https://www.youtube.com';
