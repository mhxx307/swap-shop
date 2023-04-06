import classNames from 'classnames';
import BaseButton, { BaseButtonProps } from './BaseButton';

export interface ButtonProps extends BaseButtonProps {
    secondary?: boolean;
}

const Button = ({
    className,
    children,
    secondary,
    ...passProps
}: ButtonProps) => {
    return (
        <BaseButton
            type="button"
            className={classNames(
                'flex items-center space-x-2 rounded-md px-4 py-1 hover:bg-opacity-80',
                className,
                passProps.primary && 'text-white',
                secondary && 'hover:bg-opacity/20 bg-secondary',
                secondary &&
                    passProps.outline &&
                    'border border-secondary bg-transparent',
            )}
            {...passProps}
        >
            {children}
        </BaseButton>
    );
};

export default Button;
