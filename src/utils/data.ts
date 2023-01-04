import enTranslations from '@/constants/en';
import viTranslations from '@/constants/vi';

export const getConstantTranslation = (locale: string | undefined) => {
    switch (locale) {
        case 'vi':
            return viTranslations;
        case 'en':
            return enTranslations;
    }
};
