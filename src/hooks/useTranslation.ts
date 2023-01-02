import * as constantsEN from '@/constants/en';
import * as constantsVI from '@/constants/vi';
import { HeaderNavListProps, PopupMenuItemProps } from '@/types';

const useTranslation = (code: string) => {
    let headerNavList: HeaderNavListProps[] = [];
    let popupMenuList: PopupMenuItemProps[] = [];
    let popupUserMenuList: PopupMenuItemProps[] = [];

    switch (code) {
        case 'vi':
            headerNavList = constantsVI.HEADER_NAV_LIST;
            popupMenuList = constantsVI.POPUP_MENU_LIST;
            popupUserMenuList = constantsVI.POPUP_USER_MENU_LIST;
            break;
        case 'en':
            headerNavList = constantsEN.HEADER_NAV_LIST;
            popupMenuList = constantsEN.POPUP_MENU_LIST;
            popupUserMenuList = constantsEN.POPUP_USER_MENU_LIST;
            break;
    }

    return {
        headerNavList,
        popupMenuList,
        popupUserMenuList,
    };
};

export default useTranslation;
