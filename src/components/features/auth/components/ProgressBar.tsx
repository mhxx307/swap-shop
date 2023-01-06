import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';

interface progress {
    title: string;
    number: number;
}

interface ProgressBarProps {
    progressList: progress[];
    stepCurrentNumber: number;
    goTo: (index: number) => void;
}

const ProgressBar = ({
    progressList,
    stepCurrentNumber,
    goTo,
}: ProgressBarProps) => {
    return (
        <div className="px-8 flex justify-between items-center">
            {progressList.map((progress: progress) => {
                //  stepCurrentNumber lay tu useMultiStepForm array nên có giá trị bắt đầu là 0
                //  nên trong mảng progress phải cho number là 0, hiển thị ra ngoài thì cho + 1
                const isCurrentProgress = stepCurrentNumber === progress.number;
                const isLastProgress =
                    progressList.length - 1 === progress.number;
                // cho những thằng cũ vẫn giữ màu primary khi hoàn thành 1 form và dấu check
                const isPreviousProgress = stepCurrentNumber > progress.number;

                return (
                    <React.Fragment key={progress.title}>
                        <div className="relative flex flex-col items-center text-primary-500">
                            <div
                                className={`cursor-pointer rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${
                                    isPreviousProgress || isCurrentProgress
                                        ? 'bg-primary-500 text-white'
                                        : ''
                                }`}
                                onClick={() => goTo(progress.number)}
                            >
                                {isPreviousProgress ? (
                                    <AiOutlineCheck />
                                ) : (
                                    progress.number + 1
                                )}
                            </div>
                            <div
                                className={`absolute top-0 text-center mt-16 w-32 text-[1.2rem] font-bold uppercase ${
                                    isCurrentProgress
                                        ? 'text-black dark:text-white'
                                        : 'text-gray-500'
                                }`}
                            >
                                {progress.title}
                            </div>
                        </div>
                        <div
                            className={`flex-auto border-t-2 transition duration-500 ease-linear ${
                                isPreviousProgress
                                    ? 'border-primary-500'
                                    : 'border-gray-300'
                            } ${isLastProgress && 'hidden'}`}
                        />
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default ProgressBar;
