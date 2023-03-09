/* eslint-disable react/jsx-key */
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useMultiStepForm, useValidateSchema } from '@/hooks';
import { Button } from '@/components/shared';
import { PROGRESS_LIST } from '@/constants';
import {
    AccountForm,
    AddressForm,
    FinishForm,
    ProgressBar,
    UserForm,
} from './components/register';
import {
    MeDocument,
    MeQuery,
    useRegisterMutation,
    RegisterInput,
} from '@/generated/graphql';
import { useRouter } from 'next/router';
import { omit } from 'lodash';

interface FormState extends RegisterInput {
    password: string;
    confirmPassword: string;
}

export const initialData: FormState = {
    fullName: '',
    birthday: '',
    address: '',
    email: '',
    username: '',
    password: '',
    phoneNumber: '',
    confirmPassword: '',
};

const RegisterForm = () => {
    const router = useRouter();
    const schema = useValidateSchema('register');

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormState>({
        defaultValues: {
            ...initialData,
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

    const [register, { loading, error }] = useRegisterMutation();

    if (error) return <p>Submission error</p>;

    const handleRegister = async (payload: FormState) => {
        const registerInput = omit(payload, ['confirmPassword']);

        const response = await register({
            variables: {
                registerInput,
            },
            update(cache, { data }) {
                if (data?.register.success) {
                    cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: { me: data.register.user },
                    });
                }
            },
        });

        if (response.data?.register.errors) {
            response.data?.register.errors.forEach((error) => {
                if (
                    error.field === 'username' ||
                    error.field === 'email' ||
                    error.field === 'phoneNumber'
                ) {
                    setError(
                        error.field,
                        {
                            type: 'focus',
                            message: error.message,
                        },
                        { shouldFocus: true },
                    );
                }
            });
        } else if (response.data?.register.success) {
            router.push('/login');
        }
    };

    const handleNextStep = () => {
        if (!isLastStep) return next();

        Object.entries(errors).forEach(([_errorKey, errorValue]) => {
            const errorMessage = errorValue?.message;
            if (errorMessage) {
                toast.error(errorMessage.toString(), {
                    toastId: errorMessage.toString(),
                });
            }
        });
    };

    return (
        <>
            <div className="flex min-h-screen w-[100%] flex-col space-y-28 py-[80px] px-[20px] md:w-[1084px] md:py-[20px] md:px-0">
                <h3 className="text-center text-5xl font-bold">Registration</h3>

                <ProgressBar
                    progressList={PROGRESS_LIST}
                    stepCurrentNumber={currentStepIndex}
                    goTo={goTo}
                />

                <div className="mt-[30px] w-full rounded-md bg-white p-[20px] shadow-md dark:bg-secondaryDark">
                    <form
                        onSubmit={handleSubmit(handleRegister)}
                        className="flex min-h-[400px] flex-col justify-between"
                    >
                        <div>{currentStep}</div>
                        <div className="mt-[40px] flex justify-end gap-2">
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
        </>
    );
};

export default RegisterForm;
