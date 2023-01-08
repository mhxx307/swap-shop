import { AiOutlineQuestionCircle, AiOutlineUser } from 'react-icons/ai';
import { CgShortcut } from 'react-icons/cg';
import { BsGear } from 'react-icons/bs';
import { VscSignOut } from 'react-icons/vsc';
import { NavListProps, PopupMenuItemProps } from '@/types';

const HEADER_NAV_LIST: NavListProps[] = [
    { path: '/', label: 'Trang chủ' },
    { path: '/articles', label: 'Bài viết' },
    { path: '/about', label: 'Giới thiệu' },
];

const POPUP_MENU_LIST: PopupMenuItemProps[] = [
    {
        icon: AiOutlineQuestionCircle,
        title: 'Phản hồi và giúp đỡ',
        to: '/feedback',
    },
    { icon: CgShortcut, title: 'Phím tắt', to: '/shortcuts' },
];

const POPUP_USER_MENU_LIST: PopupMenuItemProps[] = [
    { icon: AiOutlineUser, title: 'Thông tin tài khoản', to: '/@hoa' },
    { icon: BsGear, title: 'Cài đặt', to: '/settings' },
    ...POPUP_MENU_LIST,
    { icon: VscSignOut, title: 'Đăng xuất', to: '/logout', separate: true },
];

const viTranslations = {
    HEADER_NAV_LIST,
    POPUP_MENU_LIST,
    POPUP_USER_MENU_LIST,
};

export default viTranslations;
