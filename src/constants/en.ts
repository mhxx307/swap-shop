import { AiOutlineQuestionCircle, AiOutlineUser } from 'react-icons/ai';
import { CgShortcut } from 'react-icons/cg';
import { BsGear } from 'react-icons/bs';
import { VscSignOut } from 'react-icons/vsc';
import { HeaderNavListProps, PopupMenuItemProps } from '@/types';

const HEADER_NAV_LIST: HeaderNavListProps[] = [
    { path: '/', label: 'home' },
    { path: '/products', label: 'Share' },
    { path: '/about', label: 'About' },
];

const POPUP_MENU_LIST: PopupMenuItemProps[] = [
    {
        icon: AiOutlineQuestionCircle,
        title: 'Feedback and Help',
        to: '/feedback',
    },
    { icon: CgShortcut, title: 'Keyboard shortcuts' },
];

const POPUP_USER_MENU_LIST: PopupMenuItemProps[] = [
    { icon: AiOutlineUser, title: 'View profile', to: '/@hoa' },
    { icon: BsGear, title: 'Settings', to: '/settings' },
    ...POPUP_MENU_LIST,
    { icon: VscSignOut, title: 'Log out', to: '/logout', separate: true },
];

const CUSTOMER_FOOTER_NAV_LIST = [
    { path: '/asd', label: 'Customer care' },
    { path: '/products', label: 'Help center' },
    { path: '/about', label: 'Warranty Policy' },
];

const ABOUT_FOOTER_NAV_LIST = [
    { path: '/asd', label: 'About us' },
    { path: '/products', label: 'Swap Shop Terms' },
    { path: '/about', label: 'Contact us' },
];

const SOCIAL_FOOTER_NAV_LIST = [
    { path: '/asd', label: 'Follow us on' },
    { path: '/products', label: 'Facebook' },
    { path: '/about', label: 'Instagram' },
];

const FOOTER_LIST = [
    ABOUT_FOOTER_NAV_LIST,
    CUSTOMER_FOOTER_NAV_LIST,
    SOCIAL_FOOTER_NAV_LIST,
    SOCIAL_FOOTER_NAV_LIST,
];

const enTranslations = {
    HEADER_NAV_LIST,
    POPUP_MENU_LIST,
    POPUP_USER_MENU_LIST,
    FOOTER_LIST,
};

export default enTranslations;
