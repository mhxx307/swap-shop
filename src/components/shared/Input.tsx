import { forwardRef, memo } from 'react';
import classNames from 'classnames';

interface Icon {
    className?: string;
}

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
    containerClassName?: string;
    containerInputClassName?: string;
    labelClassName?: string;
    iconClassName?: string;
    LeftIcon?: React.ComponentType<Icon>;
    RightIcon?: React.ComponentType<Icon>;
    leftIconOnClick?: () => void;
    rightIconOnClick?: () => void;
    label?: string;
}

// first props is for ref, second props is for props
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {
        label,
        containerClassName,
        containerInputClassName,
        labelClassName,
        iconClassName,
        LeftIcon,
        RightIcon,
        leftIconOnClick,
        rightIconOnClick,
        className,
        ...inputProps
    } = props;

    return (
        <div className={containerClassName}>
            {label && (
                <p className={classNames('mb-2 font-semibold', labelClassName)}>
                    {label}
                </p>
            )}

            <div
                className={classNames(
                    'shadow flex items-center space-x-2 bg-background-800 focus:ring focus:ring-primary-500 focus:shadow-outline rounded',
                    LeftIcon || RightIcon ? 'px-3 py-2' : 'py-1',
                    containerInputClassName,
                )}
            >
                {LeftIcon && (
                    <span onClick={leftIconOnClick}>
                        <LeftIcon
                            className={classNames(iconClassName, 'w-6 h-6')}
                        />
                    </span>
                )}

                <input
                    ref={ref}
                    className={classNames(
                        'bg-transparent appearance-none w-full text-gray-300 focus:outline-none leading-tight',
                        className,
                    )}
                    {...inputProps}
                />

                {RightIcon && (
                    <span onClick={rightIconOnClick}>
                        <RightIcon
                            className={classNames(iconClassName, 'w-6 h-6')}
                        />
                    </span>
                )}
            </div>
        </div>
    );
});

Input.displayName = 'Input';

export default memo(Input);