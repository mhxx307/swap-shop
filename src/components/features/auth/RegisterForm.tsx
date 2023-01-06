/* eslint-disable react/jsx-key */
import { useMultiStepForm } from '@/hooks';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/shared';
import { RegisterPayload } from '@/types';
import { REGISTER_INITIAL_DATA, PROGRESS_LIST } from '@/constants';
import { AccountForm, AddressForm, ProgressBar, UserForm } from './components';

const RegisterForm = () => {
    const { control, handleSubmit } = useForm<RegisterPayload>({
        defaultValues: {
            ...REGISTER_INITIAL_DATA,
        },
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
        <h3>Are u sure?</h3>,
    ]);

    function handleRegister(payload: RegisterPayload) {
        if (!isLastStep) return next();
        alert(payload.email);
    }

    return (
        <div className="h-screen w-[1084px] flex flex-col justify-around">
            <h3 className="text-[3rem] font-bold text-center">Registration</h3>

            <ProgressBar
                progressList={PROGRESS_LIST}
                stepCurrentNumber={currentStepIndex}
                goTo={goTo}
            />

            <div className="bg-white dark:bg-secondaryDark shadow-md p-[2rem] m-[1rem] rounded-md w-full">
                <form
                    onSubmit={handleSubmit(handleRegister)}
                    className="min-h-[400px] flex flex-col justify-between"
                >
                    <div>{currentStep}</div>
                    <div className="flex gap-2 justify-end mt-[1rem]">
                        {!isFirstStep && (
                            <Button
                                type="button"
                                className="bg-black text-white"
                                onClick={back}
                            >
                                Back
                            </Button>
                        )}
                        <Button primary type="submit">
                            {isLastStep ? 'Finish' : 'Next'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
