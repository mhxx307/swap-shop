import { NavItemProps, PopupMenuItemProps } from '@/types';
import { path, icons } from '.';

// header navigation
const HEADER_NAV_LIST: NavItemProps[] = [
    { path: path.home, label: 'Home' },
    { path: path.market, label: 'Market' },
    // { path: path.about, label: 'About' },
    { path: path.chat, label: 'Chat' },
];

const HEADER_MOBILE_NAV_LIST: NavItemProps[] = [...HEADER_NAV_LIST];

// menu
const POPUP_MENU_LIST: PopupMenuItemProps[] = [
    {
        icon: icons.AiOutlineQuestionCircle,
        label: 'Feedback and Help',
        path: path.contact,
    },
    // {
    //     icon: icons.CgShortcut,
    //     label: 'Keyboard shortcuts',
    //     path: path.shortcuts,
    // },
];

const POPUP_USER_MENU_LIST: PopupMenuItemProps[] = [
    {
        icon: icons.BsPencilSquare,
        label: 'New product',
        path: path.createArticle,
    },
    {
        icon: icons.BsPencilSquare,
        label: 'Favorites article',
        path: path.favorites,
    },
    {
        icon: icons.BsPencilSquare,
        label: 'Management Posts',
        path: path.dashboardPublished,
    },
    ...POPUP_MENU_LIST,
    { icon: icons.BsGear, label: 'Settings', path: path.settingsProfile },
];

const enTranslations = {
    HEADER_NAV_LIST,
    HEADER_MOBILE_NAV_LIST,
    POPUP_MENU_LIST,
    POPUP_USER_MENU_LIST,
};

export default enTranslations;
