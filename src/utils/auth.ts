import { User } from '@/generated/graphql';

export const LocalStorageEventTarget = new EventTarget();

export const clearLS = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('profile');
        localStorage.removeItem('isShowMap');
        const clearLSEvent = new Event('clearLS');
        LocalStorageEventTarget.dispatchEvent(clearLSEvent);
    }
};

export const getProfileFromLS = () => {
    if (typeof window !== 'undefined') {
        const result = localStorage.getItem('profile');
        return result ? JSON.parse(result) : null;
    }
};

export const setProfileToLS = (profile: User) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('profile', JSON.stringify(profile));
    }
};

export const getIsShowMapFromLS = () => {
    if (typeof window !== 'undefined') {
        const result = localStorage.getItem('isShowMap');
        return result ? JSON.parse(result) : false;
    }
};

export const setIsShowMapToLS = (isShowMap: boolean) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('isShowMap', JSON.stringify(isShowMap));
    }
};
