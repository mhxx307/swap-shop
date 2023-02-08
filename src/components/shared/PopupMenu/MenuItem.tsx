import classNames from 'classnames';
import { Button, ButtonLink } from '@/components/shared';
import { PopupMenuItemProps } from '@/types';

export interface MenuItemProps {
    data: PopupMenuItemProps;
    className?: string;
    titleClassName?: string;
    onClick?: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    ) => void;
}

const MenuItem = (props: MenuItemProps) => {
    const { data, className, titleClassName, onClick } = props;
    const { icon, label, separate, path } = data;
    return path ? (
        <ButtonLink
            href={path}
            LeftIcon={icon}
            onClick={onClick}
            className={classNames(
                'font-semibold py-[6px] md:py-[11px] px-[11px] md:px-[16px] leading-[18px] text-black hover:bg-[#d0d0d0] w-full',
                separate &&
                    'border-t-[1px] border-solid border-gray-300 dark:border-gray-700',
                className,
            )}
        >
            <span
                className={classNames(
                    'ml-[8px] text-responsive-sm',
                    titleClassName,
                )}
            >
                {label}
            </span>
        </ButtonLink>
    ) : (
        <Button
            LeftIcon={icon}
            onClick={onClick}
            className={classNames(
                'font-semibold py-[6px] px-[11px] md:py-[11px] md:px-[16px] leading-[18px] text-black hover:bg-[#d0d0d0] w-full',
                separate &&
                    'border-t-[1px] border-solid border-gray-300 dark:border-gray-700',
                className,
            )}
        >
            <span className={classNames('ml-[8px]', titleClassName)}>
                {label}
            </span>
        </Button>
    );
};

export default MenuItem;
