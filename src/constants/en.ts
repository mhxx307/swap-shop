import { AiOutlineQuestionCircle, AiOutlineUser } from 'react-icons/ai';
import { CgShortcut } from 'react-icons/cg';
import { BsGear } from 'react-icons/bs';
import { VscSignOut } from 'react-icons/vsc';
import { NavListProps, PopupMenuItemProps } from '@/types';

const HEADER_NAV_LIST: NavListProps[] = [
    { path: '/', label: 'Home' },
    { path: '/articles', label: 'Articles' },
    { path: '/about', label: 'About' },
];

const POPUP_MENU_LIST: PopupMenuItemProps[] = [
    {
        icon: AiOutlineQuestionCircle,
        title: 'Feedback and Help',
        to: '/feedback',
    },
    { icon: CgShortcut, title: 'Keyboard shortcuts', to: '/shortcuts' },
];

const POPUP_USER_MENU_LIST: PopupMenuItemProps[] = [
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
