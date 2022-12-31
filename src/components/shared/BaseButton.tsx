import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useEffect, forwardRef } from 'react';
import isHotKey from 'is-hotkey';
import classNames from 'classnames';

export interface BaseButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
    LeftIcon?: React.ComponentType<{ className: String }>;
    RightIcon?: React.ComponentType<{ className: String }>;
    iconClassName?: string;
    shortcutKey?: string;
    primary?: boolean;
    outline?: boolean;
    disable?: boolean;
    isLoading?: boolean;
    onClick?: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    ) => void;
}

const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
    (props, ref) => {
        const {
            children,
            className,
            iconClassName,
            LeftIcon,
            RightIcon,
            primary = false,
            outline = false,
            disable = false,
            isLoading,
            onClick,
            shortcutKey,
            ...rest
        } = props;

        useEffect(() => {
            if (!shortcutKey) return;

            const handleShortcutKey = (e: KeyboardEvent) => {
                if (isHotKey(shortcutKey, { byKey: true })(e)) {
                    onClick?.(null);
                }
            };

            window.addEventListener('keypress', handleShortcutKey);
            return () => {
                window.removeEventListener('keypress', handleShortcutKey);
            };
        }, [onClick, shortcutKey]);

        let buttonClassName: string;
        if (primary) {
            if (outline) {
                buttonClassName =
                    'text-primary-500 border-[1px] border-primary-500';
            } else {
                buttonClassName = 'bg-primary-500';
            }
        } else {
            if (outline) {
                buttonClassName = 'border-solid border-[1px] border-black';
            } else {
                buttonClassName = 'bg-white';
            }
        }

        const iconClass =
            !iconClassName?.includes('w-') || !iconClassName?.includes('h-')
                ? classNames('w-6 h-6', iconClassName)
                : iconClassName;

        return (
            <button
                type="button"
                className={classNames(
                    'flex transition duration-300 outline-none',
                    (isLoading || disable) &&
                        'text-gray-300 cursor-not-allowed',
                    buttonClassName,
                    className,
                    (LeftIcon || RightIcon || isLoading) && 'gap-x-2',
                )}
                {...rest}
                ref={ref}
                onClick={(e) => {
                    if (disable) return;
                    onClick?.(e);
                }}
            >
                {isLoading ? (
                    <AiOutlineLoading3Quarters
                        className={classNames(iconClass, 'animate-spin')}
                    />
                ) : (
                    LeftIcon && <LeftIcon className={iconClass} />
                )}
                {children}
                {RightIcon && <RightIcon className={iconClass} />}
            </button>
        );
    },
);

BaseButton.displayName = 'BaseButton';

export default BaseButton;
