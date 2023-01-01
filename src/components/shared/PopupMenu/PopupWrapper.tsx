import classNames from 'classnames';

export interface PopupWrapperProps {
    children: React.ReactNode;
    className?: string;
}

const PopupWrapper = ({ children, className }: PopupWrapperProps) => {
    const wrapper =
        'flex flex-col items-start w-full min-h-[100px] bg-white dark:bg-gray-800 rounded[8px] pt-[8px]';
    return (
        <div
            className={classNames(
                wrapper,
                className,
                'max-h-[min((100vh-96px)-60px, 700px)]',
            )}
        >
            {children}
        </div>
    );
};

export default PopupWrapper;
