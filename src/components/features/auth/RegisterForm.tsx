/* eslint-disable react/jsx-key */
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useMultiStepForm } from '@/hooks';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/shared';
import { RegisterPayload } from '@/types';
import { REGISTER_INITIAL_DATA, PROGRESS_LIST } from '@/constants';
import {
    AccountForm,
    AddressForm,
    FinishForm,
    ProgressBar,
    UserForm,
} from './components/register';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '@/graphql/mutation';

const RegisterForm = () => {
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
        })
        .required();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterPayload>({
        defaultValues: {
            ...REGISTER_INITIAL_DATA,
        },
        resolver: yupResolver(schema),
        mode: 'all',
    });

    const {
        currentStep,
        currentStepIndex,
        next,
        back,
        goTo,
        isFirstStep,
        isLastStep,
    } = useMultiStepForm([
        <AccountForm control={control} />,
        <UserForm control={control} />,
        <AddressForm control={control} />,
        <FinishForm />,
    ]);

    const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION);

    if (error) return `Submission error! ${error.message}`;

    const handleRegister = (payload: RegisterPayload) => {
        const { confirmPassword, date, ...rest } = payload;
        const { startDate: birthday } = date;
        const registerInput = { ...rest, birthday };

        register({
            variables: {
                registerInput,
            },
        });
    };

    const handleNextStep = () => {
        if (!isLastStep) return next();

        if (errors) {
            alert(
                `There are a few fields that have not yet entered enough data, please come back and check. Sorry for the inconvenience. We will upgrade the test in the future.
                ${JSON.stringify(errors)}`,
            );
        }
    };

    return (
        <div className="min-h-screen w-[100%] md:w-[1084px] flex flex-col space-y-28 py-[80px] md:py-[20px] px-[20px] md:px-0">
            <h3 className="text-5xl font-bold text-center">Registration</h3>

            <ProgressBar
                progressList={PROGRESS_LIST}
                stepCurrentNumber={currentStepIndex}
                goTo={goTo}
            />

            <div className="bg-white dark:bg-secondaryDark shadow-md p-[20px] mt-[30px] rounded-md w-full">
                <form
                    onSubmit={handleSubmit(handleRegister)}
                    className="min-h-[400px] flex flex-col justify-between"
                >
                    <div>{currentStep}</div>
                    <div className="flex gap-2 justify-end mt-[40px]">
                        {!isFirstStep && (
                            <Button
                                type="button"
                                className="bg-black text-white dark:hover:bg-gray-700"
                                onClick={back}
                            >
                                Back
                            </Button>
                        )}
                        <Button
                            primary
                            type={isLastStep ? 'submit' : 'button'}
                            shortcutKey="enter"
                            onClick={handleNextStep}
                            isLoading={loading}
                        >
                            {isLastStep ? 'Finish' : 'Next'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
