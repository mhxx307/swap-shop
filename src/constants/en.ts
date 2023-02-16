import { AiOutlineQuestionCircle, AiOutlineUser } from 'react-icons/ai';
import { CgShortcut } from 'react-icons/cg';
import { BsGear, BsPencilSquare } from 'react-icons/bs';
import { VscSignOut } from 'react-icons/vsc';
import { PopupMenuItemProps } from '@/types';

const HEADER_NAV_LIST: PopupMenuItemProps[] = [
    { path: '/', label: 'Home' },
    { path: '/articles', label: 'Second hand transaction' },
    { path: '/about', label: 'About' },
];

const HEADER_MOBILE_NAV_LIST: PopupMenuItemProps[] = [...HEADER_NAV_LIST];

const POPUP_MENU_LIST: PopupMenuItemProps[] = [
    {
        icon: AiOutlineQuestionCircle,
        label: 'Feedback and Help',
        path: '/contact',
    },
    { icon: CgShortcut, label: 'Keyboard shortcuts', path: '/shortcuts' },
];

const POPUP_USER_MENU_LIST: PopupMenuItemProps[] = [
    { icon: BsPencilSquare, label: 'New product', path: '/create-article' },
    ...POPUP_MENU_LIST,
    { icon: BsGear, label: 'Settings', path: '/settings/profile' },
    { icon: VscSignOut, label: 'Log out', separate: true },
];

const enTranslations = {
    HEADER_NAV_LIST,
    HEADER_MOBILE_NAV_LIST,
    POPUP_MENU_LIST,
    POPUP_USER_MENU_LIST,
};

export default enTranslations;
