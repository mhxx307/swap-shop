import getSchema from '@/constants/schema';

// union type
type validateName = 'register' | 'login' | 'changePassword' | 'priceMinMax';

const useValidateSchema = (name: validateName) => {
    const registerSchema = getSchema().pick([
        'email',
        'username',
        'password',
        'confirmPassword',
        'fullName',
    ]);

    const loginSchema = getSchema().pick(['usernameOrEmail', 'password']);

    const changePasswordSchema = getSchema().pick([
        'password',
        'confirmPassword',
    ]);

    const priceMinMaxSchema = getSchema().pick(['price_min', 'price_max']);

    switch (name) {
        case 'register':
            return registerSchema;
        case 'login':
            return loginSchema;
        case 'changePassword':
            return changePasswordSchema;
        case 'priceMinMax':
            return priceMinMaxSchema;
        default:
            return loginSchema;
    }
};

export default useValidateSchema;
