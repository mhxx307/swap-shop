import { AiOutlineQuestionCircle, AiOutlineUser } from 'react-icons/ai';
import { CgShortcut } from 'react-icons/cg';
import { BsGear, BsPencilSquare } from 'react-icons/bs';
import { VscSignOut } from 'react-icons/vsc';
import { PopupMenuItemProps } from '@/types';

const HEADER_NAV_LIST: PopupMenuItemProps[] = [
    { path: '/', label: 'Trang chủ' },
    { path: '/articles', label: 'Bài viết' },
    { path: '/about', label: 'Giới thiệu' },
    { path: '/trust', label: 'Tin cậy' },
];

const HEADER_MOBILE_NAV_LIST: PopupMenuItemProps[] = [
    { path: '/search', label: 'Tìm kiếm' },
    ...HEADER_NAV_LIST,
];

const POPUP_MENU_LIST: PopupMenuItemProps[] = [
    {
        icon: AiOutlineQuestionCircle,
        label: 'Phản hồi và giúp đỡ',
        path: '/contact',
    },
    { icon: CgShortcut, label: 'Phím tắt', path: '/shortcuts' },
    { icon: BsGear, label: 'Cài đặt', path: '/settings/profile' },
];

const POPUP_USER_MENU_LIST: PopupMenuItemProps[] = [
    { icon: BsPencilSquare, label: 'Tạo bài viết', path: '/create-article' },
    ...POPUP_MENU_LIST,
    { icon: VscSignOut, label: 'Đăng xuất', path: '/logout', separate: true },
];

const viTranslations = {
    HEADER_NAV_LIST,
    HEADER_MOBILE_NAV_LIST,
    POPUP_MENU_LIST,
    POPUP_USER_MENU_LIST,
};

export default viTranslations;
