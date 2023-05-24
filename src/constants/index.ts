import { ProgressItemProps } from '@/types';
import { CgShortcut } from 'react-icons/cg';
import { BsGear, BsPencilSquare } from 'react-icons/bs';
import { VscSignOut } from 'react-icons/vsc';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

export const REVALIDATE_TIME = 86_400 as const; // 24 hours

export const PROGRESS_LIST: ProgressItemProps[] = [
    {
        title: 'Account',
        number: 0,
    },
    {
        title: 'User',
        number: 1,
    },
];

export const FACEBOOK_URL = 'https://www.facebook.com';
export const YOUTUBE_URL = 'https://www.youtube.com';
export const WEBSITE_URL = 'https://secondchance.vercel.app';

export const supportedUploadImageFormats = ['jpg', 'jpeg', 'png'];

export const limitCommentsPaginated = 10 as const;

export const path = {
    home: '/',
    articles: '/articles',
    about: '/about',
    contact: '/contact',
    shortcuts: '/shortcuts',
    createArticle: '/articles/edit/create-article',
    editArticle: '/articles/edit',
    settingsProfile: '/settings/profile',
    login: '/login',
    logout: '/logout',
    register: '/register',
    forgotPassword: '/forgot-password',
    tos: '/tos',
    dmca: '/dmca',
    privacy: '/privacy',
    categories: '/categories',
    market: '/market',
    favorites: '/favorites',
    chat: '/chat',
    personal: '/personal',
    dashboardPublished: '/dashboard/published',
} as const;

export const icons = {
    CgShortcut,
    BsGear,
    BsPencilSquare,
    VscSignOut,
    AiOutlineQuestionCircle,
} as const;

export const STATUS_ARTICLE = {
    BLOCKED: 'blocked',
    PENDING: 'pending',
    REJECTED: 'rejected',
    APPROVED: 'approved',
} as const;

export const SORT_BY = {
    createDate: 'createdDate',
    views: 'views',
    price: 'price',
    favorites: 'favoritesCount',
} as const;

export const ORDER = { desc: 'DESC', asc: 'ASC' } as const;
