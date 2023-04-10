import { forwardRef, memo } from 'react';
import classNames from 'classnames';

interface Icon {
    className?: string;
}

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
    classnamewrapper?: string;
    containerInputClassName?: string;
    labelClassName?: string;
    iconClassName?: string;
    LeftIcon?: React.ComponentType<Icon>;
    RightIcon?: React.ComponentType<Icon>;
    leftIconOnClick?: () => void;
    rightIconOnClick?: (e: any) => void;
    label?: string;
    defaultLayout?: boolean;
    onlyNumber?: boolean;
}

// first props is for ref, second props is for props
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {
        label,
        defaultLayout,
        classnamewrapper,
        containerInputClassName,
        labelClassName,
        iconClassName,
        LeftIcon,
        RightIcon,
        leftIconOnClick,
        rightIconOnClick,
        className,
        onlyNumber = false,
        onChange,
        ...inputProps
    } = props;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if ((/^\d+$/.test(value) || value === '') && onChange) {
            // Thực thi onChange callback từ bên ngoài truyền vào props
            onChange(event);
        }
    };

    return (
        <div className={classnamewrapper}>
            {label && (
                <p className={classNames('mb-2 font-semibold', labelClassName)}>
                    {label}
                </p>
            )}

            <div
                className={classNames(
                    `${
                        defaultLayout &&
                        'bg-background-800 focus:shadow-outline flex items-center space-x-2 rounded px-3 focus:ring focus:ring-primary-500 dark:border-[1px] dark:border-white'
                    }`,
                    LeftIcon || RightIcon ? 'py-2' : 'py-1',
                    containerInputClassName,
                )}
            >
                {LeftIcon && (
                    <button onClick={leftIconOnClick}>
                        <LeftIcon
                            className={classNames('h-6 w-6', iconClassName)}
                        />
                    </button>
                )}

                <input
                    ref={ref}
                    className={classNames(
                        'w-full appearance-none bg-transparent leading-tight focus:outline-none',
                        className,
                    )}
                    spellCheck={false}
                    {...inputProps}
                    onChange={onlyNumber ? handleChange : onChange}
                />

                {RightIcon && (
                    <button onClick={rightIconOnClick}>
                        <RightIcon
                            className={classNames('h-6 w-6', iconClassName)}
                        />
                    </button>
                )}
            </div>
        </div>
    );
});

Input.displayName = 'Input';

export default memo(Input);
