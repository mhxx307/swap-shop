import * as yup from 'yup';

const getSchema = () => {
    const schema = yup
        .object({
            email: yup
                .string()
                .required('Please enter your email')
                .matches(
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                    'Incorrect format of email',
                ),
            username: yup
                .string()
                .required('Please enter your username')
                .min(2, 'Username must be at least 2 characters long')
                .max(20, 'Username must be at most 20 characters long')
                .matches(
                    /^(?=[a-zA-Z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/g,
                    'Username is 2-20 characters long, not special characters',
                ),
            password: yup
                .string()
                .required('Please enter your password')
                .min(8, 'Password must be at least 8 characters long')
                .matches(
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                    'At least 8 characters must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number Can contain special characters.',
                ),
            confirmPassword: yup
                .string()
                .required('Please enter your confirm password')
                .oneOf([yup.ref('password'), null], 'Passwords must match'),
            fullName: yup
                .string()
                .required('Please enter your full name')
                .matches(
                    /(?:[A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ][a-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵ]{1,}\s)+[A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ][a-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵ]+/g,
                    'Incorrect format',
                ),
            phoneNumber: yup
                .string()
                .required('Please enter your phone number')
                .matches(
                    /^(0|\+84)(\s|\.)?((3[3-9])|(5[689])|(7[06-9])|(8[1-6789])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/gm,
                    'Incorrect format',
                ),
            address: yup.string().required('Please enter your address'),
            usernameOrEmail: yup
                .string()
                .min(2, 'Must be at least 2 characters long')
                .required('Please enter your username or email'),
        })
        .required();

    return schema;
};

export default getSchema;
