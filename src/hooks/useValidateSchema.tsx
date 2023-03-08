import getSchema from "@/constants/schema";


// union type
type validateName = 'register' | 'login' | 'changePassword';

const useValidateSchema = ( name: validateName ) => {
    const registerSchema = getSchema().pick(['email', 'username', 'password', 'confirmPassword', 'fullName', 'phoneNumber', 'address']);

    const loginSchema = getSchema().pick(['usernameOrEmail', 'password']);

    const changePasswordSchema = getSchema().pick(['password', 'confirmPassword']);

    switch (name) {
        case 'register':
            return registerSchema;
        case 'login':
            return loginSchema;
        case 'changePassword':
            return changePasswordSchema;
        default:
            return loginSchema;
    }
};

export default useValidateSchema;
