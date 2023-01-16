import { AiOutlineQuestionCircle, AiOutlineUser } from 'react-icons/ai';
import { CgShortcut } from 'react-icons/cg';
import { BsGear, BsPencilSquare } from 'react-icons/bs';
import { VscSignOut } from 'react-icons/vsc';
import { PopupMenuItemProps } from '@/types';

const HEADER_NAV_LIST: PopupMenuItemProps[] = [
    { path: '/', label: 'Home' },
    { path: '/articles', label: 'Articles' },
    { path: '/about', label: 'About' },
    { path: '/trust', label: 'Trust' },
];

const HEADER_MOBILE_NAV_LIST: PopupMenuItemProps[] = [
    { path: '/search', label: 'Search' },
    ...HEADER_NAV_LIST,
];

const POPUP_MENU_LIST: PopupMenuItemProps[] = [
    {
        icon: AiOutlineQuestionCircle,
        label: 'Feedback and Help',
        path: '/contact',
    },
    { icon: CgShortcut, label: 'Keyboard shortcuts', path: '/shortcuts' },
    { icon: BsGear, label: 'Settings', path: '/settings/profile' },
];

const POPUP_USER_MENU_LIST: PopupMenuItemProps[] = [
    { icon: BsPencilSquare, label: 'Create article', path: '/create-article' },
    ...POPUP_MENU_LIST,
    { icon: VscSignOut, label: 'Log out', path: '/logout', separate: true },
];

const enTranslations = {
    HEADER_NAV_LIST,
    HEADER_MOBILE_NAV_LIST,
    POPUP_MENU_LIST,
    POPUP_USER_MENU_LIST,
};

export default enTranslations;
