
import { PopupMenuItemProps } from '@/types';
import { path, icons } from '.';

const HEADER_NAV_LIST: PopupMenuItemProps[] = [
    { path: path.home, label: 'Home' },
    { path: path.articles, label: 'Second hand transaction' },
    { path: path.about, label: 'About' },
];

const HEADER_MOBILE_NAV_LIST: PopupMenuItemProps[] = [...HEADER_NAV_LIST];

const POPUP_MENU_LIST: PopupMenuItemProps[] = [
    {
        icon: icons.AiOutlineQuestionCircle,
        label: 'Feedback and Help',
        path: path.contact,
    },
    { icon: icons.CgShortcut, label: 'Keyboard shortcuts', path: path.shortcuts },
];

const POPUP_USER_MENU_LIST: PopupMenuItemProps[] = [
    {
        icon: icons.BsPencilSquare,
        label: 'New product',
        path: path.articlesCreate,
    },
    ...POPUP_MENU_LIST,
    { icon: icons.BsGear, label: 'Settings', path: path.settingsProfile },
    { icon: icons.VscSignOut, label: 'Log out', separate: true },
];

const enTranslations = {
    HEADER_NAV_LIST,
    HEADER_MOBILE_NAV_LIST,
    POPUP_MENU_LIST,
    POPUP_USER_MENU_LIST,
};

export default enTranslations;
