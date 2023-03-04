import { AiOutlineQuestionCircle, AiOutlineUser } from 'react-icons/ai';
import { CgShortcut } from 'react-icons/cg';
import { BsGear, BsPencilSquare } from 'react-icons/bs';
import { VscSignOut } from 'react-icons/vsc';
import { PopupMenuItemProps } from '@/types';

const HEADER_NAV_LIST: PopupMenuItemProps[] = [
    { path: '/', label: 'Trang chủ' },
    { path: '/articles', label: 'Giao dịch đồ cũ' },
    { path: '/about', label: 'Giới thiệu' },
];

const HEADER_MOBILE_NAV_LIST: PopupMenuItemProps[] = [...HEADER_NAV_LIST];

const POPUP_MENU_LIST: PopupMenuItemProps[] = [
    {
        icon: AiOutlineQuestionCircle,
        label: 'Phản hồi và giúp đỡ',
        path: '/contact',
    },
    { icon: CgShortcut, label: 'Phím tắt', path: '/shortcuts' },
];

const POPUP_USER_MENU_LIST: PopupMenuItemProps[] = [
    {
        icon: BsPencilSquare,
        label: 'Thêm sản phẩm',
        path: '/articles/create-article',
    },
    ...POPUP_MENU_LIST,
    { icon: BsGear, label: 'Cài đặt', path: '/settings/profile' },
    { icon: VscSignOut, label: 'Đăng xuất', separate: true },
];

const viTranslations = {
    HEADER_NAV_LIST,
    HEADER_MOBILE_NAV_LIST,
    POPUP_MENU_LIST,
    POPUP_USER_MENU_LIST,
};

export default viTranslations;
