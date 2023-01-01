import {
    AiOutlineGlobal,
    AiOutlineQuestionCircle,
    AiOutlineUser,
} from 'react-icons/ai';
import { CgShortcut } from 'react-icons/cg';
import { BsGear } from 'react-icons/bs';
import { VscSignOut } from 'react-icons/vsc';

export const HEADER_NAV_LIST = [
    { path: '/', label: 'Trang chủ' },
    { path: '/products', label: 'Giao dịch đồ cũ' },
    { path: '/about', label: 'Về chúng tôi' },
];

export const MENU_ITEMS = [
    {
        icon: AiOutlineGlobal,
        title: 'Tiếng Việt',
        children: {
            title: 'Language',
            data: [
                { code: 'vi', title: 'Tiếng Việt' },
                { code: 'en', title: 'English' },
            ],
        },
    },
    {
        icon: AiOutlineQuestionCircle,
        title: 'Phản hồi và giúp đỡ',
        to: '/feedback',
    },
    { icon: CgShortcut, title: 'Phím tắt' },
];

export const USER_MENU = [
    { icon: AiOutlineUser, title: 'Thông tin tài khoản', to: '/@hoa' },
    { icon: BsGear, title: 'Cài đặt', to: '/settings' },
    ...MENU_ITEMS,
    { icon: VscSignOut, title: 'Đăng xuất', to: '/logout', separate: true },
];
