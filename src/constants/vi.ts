import { AiOutlineQuestionCircle, AiOutlineUser } from 'react-icons/ai';
import { CgShortcut } from 'react-icons/cg';
import { BsGear } from 'react-icons/bs';
import { VscSignOut } from 'react-icons/vsc';
import { PopupMenuItemProps } from '@/types';

const HEADER_NAV_LIST: PopupMenuItemProps[] = [
    { path: '/', label: 'Trang chủ' },
    { path: '/articles', label: 'Bài viết' },
    { path: '/about', label: 'Giới thiệu' },
];

const POPUP_MENU_LIST: PopupMenuItemProps[] = [
    {
        icon: AiOutlineQuestionCircle,
        label: 'Phản hồi và giúp đỡ',
        path: '/feedback',
    },
    { icon: CgShortcut, label: 'Phím tắt', path: '/shortcuts' },
];

const POPUP_USER_MENU_LIST: PopupMenuItemProps[] = [
    { icon: AiOutlineUser, label: 'Thông tin tài khoản', path: '/@hoa' },
    { icon: BsGear, label: 'Cài đặt', path: '/settings' },
    ...POPUP_MENU_LIST,
    { icon: VscSignOut, label: 'Đăng xuất', path: '/logout', separate: true },
];

const viTranslations = {
    HEADER_NAV_LIST,
    POPUP_MENU_LIST,
    POPUP_USER_MENU_LIST,
};

export default viTranslations;
