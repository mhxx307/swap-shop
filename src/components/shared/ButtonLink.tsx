import NextLink from 'next/link';
import Button, { ButtonProps } from './Button';

export interface ButtonLinkProps extends ButtonProps {
    href: string;
    containerClassName?: string;
}

const ButtonLink = ({
    children,
    href,
    className,
    containerClassName,
    ...passProps
}: ButtonLinkProps) => {
    return (
        <NextLink href={href} className={containerClassName}>
            <Button {...passProps} className={className}>
                {children}
            </Button>
        </NextLink>
    );
};

export default ButtonLink;
