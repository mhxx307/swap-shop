import {
    AiOutlineGlobal,
    AiOutlineQuestionCircle,
    AiOutlineUser,
} from 'react-icons/ai';
import { CgShortcut } from 'react-icons/cg';
import { BsGear } from 'react-icons/bs';
import { VscSignOut } from 'react-icons/vsc';

export const HEADER_NAV_LIST = [
    { path: '/', label: 'home' },
    { path: '/products', label: 'Share' },
    { path: '/about', label: 'about' },
];

export const MENU_ITEMS = [
    {
        icon: AiOutlineGlobal,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                { code: 'en', title: 'English' },
                { code: 'vi', title: 'Vietnamese' },
            ],
        },
    },
    {
        icon: AiOutlineQuestionCircle,
        title: 'Feedback and Help',
        to: '/feedback',
    },
    { icon: CgShortcut, title: 'Keyboard shortcuts' },
];

export const USER_MENU = [
    { icon: AiOutlineUser, title: 'View profile', to: '/@hoa' },
    { icon: BsGear, title: 'Settings', to: '/settings' },
    ...MENU_ITEMS,
    { icon: VscSignOut, title: 'Log out', to: '/logout', separate: true },
];
