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
        <div className="flex items-center justify-between px-4">
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
                            <button
                                className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-gray-300 py-3 transition duration-500 ease-in-out ${
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
                            </button>
                            <div
                                className={`absolute top-0 mt-12 w-32 text-center text-sm font-bold uppercase ${
                                    isCurrentProgress
                                        ? 'text-black dark:text-white'
                                        : 'text-gray-500'
                                }`}
                            >
                                {progress.title}
                            </div>
                        </div>
                        <div
                            className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
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
