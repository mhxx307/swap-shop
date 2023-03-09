import { NavItemProps, PopupMenuItemProps } from '@/types';
import { getConstantTranslation } from '@/utils/data';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

type ConstantsTranslation = {
    HEADER_NAV_LIST: NavItemProps[];
    HEADER_MOBILE_NAV_LIST: NavItemProps[];
    POPUP_USER_MENU_LIST: PopupMenuItemProps[];
    POPUP_MENU_LIST: PopupMenuItemProps[];
};

const useConstantsTranslation = (): ConstantsTranslation => {
    const { locale } = useRouter();
    const translations = useMemo(
        () => getConstantTranslation(locale),
        [locale],
    );

    return translations as ConstantsTranslation;
};

export default useConstantsTranslation;
