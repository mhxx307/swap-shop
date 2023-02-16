/* eslint-disable react/jsx-key */
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useMultiStepForm, useValidateSchema } from '@/hooks';
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
import {
    MeDocument,
    MeQuery,
    useRegisterMutation,
} from '@/types/generated/graphql';
import { useRouter } from 'next/router';

const RegisterForm = () => {
    const router = useRouter();
    const schema = useValidateSchema({ name: 'register' });

    const {
        control,
        handleSubmit,
        setError,
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

    const [register, { loading, error }] = useRegisterMutation();

    if (error) return <p>Submission error</p>;

    const handleRegister = async (payload: RegisterPayload) => {
        const { confirmPassword, date, ...rest } = payload;
        const { startDate: birthday } = date;
        const registerInput = { ...rest, birthday };

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
        </>
    );
};

export default RegisterForm;
