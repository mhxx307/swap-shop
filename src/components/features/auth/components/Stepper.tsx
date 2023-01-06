import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';

interface stepper {
    title: string;
    number: number;
}

interface StepperProps {
    stepperList: stepper[];
    stepCurrentNumber: number;
    goTo: (index: number) => void;
}

const Stepper = ({ stepperList, stepCurrentNumber, goTo }: StepperProps) => {
    return (
        <div className="px-8 flex justify-between items-center">
            {stepperList.map((step: stepper) => {
                //  stepCurrentNumber lay tu useMultiStepForm array nên có giá trị bắt đầu là 0
                //  nên trong mảng stepper phải cho number là 0, hiển thị ra ngoài thì cho + 1
                const isCurrent = stepCurrentNumber === step.number;
                const isLastStep = stepperList.length - 1 === step.number;
                // cho những thằng cũ vẫn giữ màu primary khi hoàn thành 1 form và dấu check
                const isPrevious = stepCurrentNumber > step.number;
                return (
                    <React.Fragment key={step.title}>
                        <div className="relative flex flex-col items-center text-primary-500">
                            <div
                                className={`cursor-pointer rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${
                                    isPrevious || isCurrent
                                        ? 'bg-primary-500 text-white'
                                        : ''
                                }`}
                                onClick={() => goTo(step.number)}
                            >
                                {isPrevious ? (
                                    <AiOutlineCheck />
                                ) : (
                                    step.number + 1
                                )}
                            </div>
                            <div
                                className={`absolute top-0 text-center mt-16 w-32 text-[1.2rem] font-bold uppercase ${
                                    isCurrent
                                        ? 'text-black dark:text-white'
                                        : 'text-gray-500'
                                }`}
                            >
                                {step.title}
                            </div>
                        </div>
                        <div
                            className={`flex-auto border-t-2 transition duration-500 ease-linear ${
                                isPrevious
                                    ? 'border-primary-500'
                                    : 'border-gray-300'
                            } ${isLastStep && 'hidden'}`}
                        />
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default Stepper;
