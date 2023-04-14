import { User } from '@/generated/graphql';

export const LocalStorageEventTarget = new EventTarget();

export const clearLS = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('profile');
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
