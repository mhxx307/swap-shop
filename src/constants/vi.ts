import { AiOutlineQuestionCircle, AiOutlineUser } from 'react-icons/ai';
import { CgShortcut } from 'react-icons/cg';
import { BsGear } from 'react-icons/bs';
import { VscSignOut } from 'react-icons/vsc';
import { HeaderNavListProps, PopupMenuItemProps } from '@/types';

const HEADER_NAV_LIST: HeaderNavListProps[] = [
    { path: '/', label: 'Trang chủ' },
    { path: '/products', label: 'Giao dịch đồ cũ' },
    { path: '/about', label: 'Về chúng tôi' },
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

const CUSTOMER_FOOTER_NAV_LIST = [
    { path: '/asd', label: 'Chăm sóc khách hàng' },
    { path: '/products', label: 'Trung tâm trợ giúp' },
    { path: '/about', label: 'Chính sách bảo hành' },
];

const ABOUT_FOOTER_NAV_LIST = [
    { path: '/asd', label: 'Về chúng tôi' },
    { path: '/products', label: 'Điều khoản Swap Shop' },
    { path: '/about', label: 'Liên hệ với chúng tôi' },
];

const SOCIAL_FOOTER_NAV_LIST = [
    { path: '/asd', label: 'Theo dõi chúng tôi trên' },
    { path: '/products', label: 'Facebook' },
    { path: '/about', label: 'Instagram' },
];

const FOOTER_LIST = [
    ABOUT_FOOTER_NAV_LIST,
    CUSTOMER_FOOTER_NAV_LIST,
    SOCIAL_FOOTER_NAV_LIST,
    SOCIAL_FOOTER_NAV_LIST,
];

const viTranslations = {
    HEADER_NAV_LIST,
    POPUP_MENU_LIST,
    POPUP_USER_MENU_LIST,
    FOOTER_LIST,
};

export default viTranslations;
