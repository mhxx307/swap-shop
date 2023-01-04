import { AiOutlineQuestionCircle, AiOutlineUser } from 'react-icons/ai';
import { CgShortcut } from 'react-icons/cg';
import { BsGear } from 'react-icons/bs';
import { VscSignOut } from 'react-icons/vsc';
import { HeaderNavListProps, PopupMenuItemProps } from '@/types';

export const HEADER_NAV_LIST: HeaderNavListProps[] = [
    { path: '/', label: 'home' },
    { path: '/products', label: 'Share' },
    { path: '/about', label: 'About' },
];

export const POPUP_MENU_LIST: PopupMenuItemProps[] = [
    {
        icon: AiOutlineQuestionCircle,
        title: 'Feedback and Help',
        to: '/feedback',
    },
    { icon: CgShortcut, title: 'Keyboard shortcuts' },
];

export const POPUP_USER_MENU_LIST: PopupMenuItemProps[] = [
    { icon: AiOutlineUser, title: 'View profile', to: '/@hoa' },
    { icon: BsGear, title: 'Settings', to: '/settings' },
    ...POPUP_MENU_LIST,
    { icon: VscSignOut, title: 'Log out', to: '/logout', separate: true },
];

const enTranslations = {
    HEADER_NAV_LIST,
    POPUP_MENU_LIST,
    POPUP_USER_MENU_LIST,
};

export default enTranslations;
