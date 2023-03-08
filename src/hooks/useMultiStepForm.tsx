import { ReactElement, useState } from 'react';

const useMultiStepForm = (stepList: ReactElement[]) => {
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

    const next = () => {
        setCurrentStepIndex((prevIndex) => {
            if (prevIndex >= stepList.length - 1) return prevIndex;
            return prevIndex + 1;
        });
    };

    const back = () => {
        setCurrentStepIndex((prevIndex) => {
            if (prevIndex <= 0) return prevIndex;
            return prevIndex - 1;
        });
    };

    const goTo = (index: number) => {
        setCurrentStepIndex(index);
    };

    return {
        currentStepIndex,
        currentStep: stepList[currentStepIndex],
        stepList,
        next,
        back,
        goTo,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === stepList.length - 1,
    };
};

export default useMultiStepForm;
