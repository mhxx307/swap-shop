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
                'flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-opacity-80',
                className,
                passProps.primary && 'text-white',
                secondary && 'bg-transparent hover:bg-white/20',
            )}
            {...passProps}
        >
            {children}
        </BaseButton>
    );
};

export default Button;
