/* eslint-disable react/jsx-key */
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useMultiStepForm, useValidateSchema } from '@/hooks';
import { Button } from '@/components/shared';
import { PROGRESS_LIST } from '@/constants';
import {
    AccountForm,
    FinishForm,
    ProgressBar,
    UserForm,
} from './components/register';
import { useRegisterMutation, RegisterInput } from '@/generated/graphql';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';
import { useTranslation } from 'react-i18next';

interface FormState extends RegisterInput {
    password: string;
    confirmPassword: string;
}

export const initialData: FormState = {
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
};

const RegisterForm = () => {
    const router = useRouter();
    const schema = useValidateSchema('register');
    const { t } = useTranslation('common');

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
            onCompleted: (data) => {
                if (data?.register.success) {
                    toast.success(
                        t('register_success') ||
                            'Register success - Check your email to verify account!',
                    );
                }
                router.push('/login');
            },
        });

        if (response.data?.register.errors) {
            response.data?.register.errors.forEach((error) => {
                if (error.field === 'username' || error.field === 'email') {
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
        <div className="container">
            <div className="mb-24">
                <ProgressBar
                    progressList={PROGRESS_LIST}
                    stepCurrentNumber={currentStepIndex}
                    goTo={goTo}
                />
            </div>

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
                                {t('back')}
                            </Button>
                        )}
                        <Button
                            primary
                            type={isLastStep ? 'submit' : 'button'}
                            shortcutKey="enter"
                            onClick={handleNextStep}
                            isLoading={loading}
                        >
                            {isLastStep ? t('finish') : t('next')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
