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
    const { icon, title, separate, to } = data;
    return to ? (
        <ButtonLink
            href={to}
            LeftIcon={icon}
            onClick={onClick}
            className={classNames(
                'font-[600] py-[11px] px-[16px] leading-[18px] text-black hover:bg-[#d0d0d0] w-full',
                separate &&
                    'border-t-[1px] border-solid border-gray-300 dark:border-gray-700',
                className,
            )}
        >
            <span className={classNames('ml-[8px]', titleClassName)}>
                {title}
            </span>
        </ButtonLink>
    ) : (
        <Button
            LeftIcon={icon}
            onClick={onClick}
            className={classNames(
                'font-[600] py-[11px] px-[16px] leading-[18px] text-black hover:bg-[#d0d0d0] w-full',
                separate &&
                    'border-t-[1px] border-solid border-gray-300 dark:border-gray-700',
                className,
            )}
        >
            <span className={classNames('ml-[8px]', titleClassName)}>
                {title}
            </span>
        </Button>
    );
};

export default MenuItem;
