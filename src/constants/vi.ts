import { PopupMenuItemProps } from '@/types';
import { path, icons } from '.';

const HEADER_NAV_LIST: PopupMenuItemProps[] = [
    { path: path.home, label: 'Trang chủ' },
    { path: path.articles, label: 'Giao dịch đồ cũ' },
    { path: path.about, label: 'Giới thiệu' },
];

const HEADER_MOBILE_NAV_LIST: PopupMenuItemProps[] = [...HEADER_NAV_LIST];

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
    ...POPUP_MENU_LIST,
    { icon: icons.BsGear, label: 'Cài đặt', path: path.settingsProfile },
    { icon: icons.VscSignOut, label: 'Đăng xuất', separate: true },
];

const viTranslations = {
    HEADER_NAV_LIST,
    HEADER_MOBILE_NAV_LIST,
    POPUP_MENU_LIST,
    POPUP_USER_MENU_LIST,
};

export default viTranslations;
