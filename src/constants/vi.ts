import { NavItemProps, PopupMenuItemProps } from '@/types';
import { path, icons } from '.';

const HEADER_NAV_LIST: NavItemProps[] = [
    { path: path.home, label: 'Trang chủ' },
    { path: path.about, label: 'Giới thiệu' },
];

const HEADER_MOBILE_NAV_LIST: NavItemProps[] = [...HEADER_NAV_LIST];

const POPUP_MENU_LIST: PopupMenuItemProps[] = [
    {
        icon: icons.AiOutlineQuestionCircle,
        label: 'Phản hồi và giúp đỡ',
        path: path.contact,
    },
    { icon: icons.CgShortcut, label: 'Phím tắt', path: path.shortcuts },
];

const POPUP_USER_MENU_LIST: PopupMenuItemProps[] = [
    {
        icon: icons.BsPencilSquare,
        label: 'Thêm sản phẩm',
        path: path.articlesCreate,
    },
    {
        icon: icons.BsPencilSquare,
        label: 'Bài viết yêu thích',
        path: path.favorites,
    },
    ...POPUP_MENU_LIST,
    { icon: icons.BsGear, label: 'Cài đặt', path: path.settingsProfile },
];

const viTranslations = {
    HEADER_NAV_LIST,
    HEADER_MOBILE_NAV_LIST,
    POPUP_MENU_LIST,
    POPUP_USER_MENU_LIST,
};

export default viTranslations;
