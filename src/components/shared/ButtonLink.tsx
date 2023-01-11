import NextLink from 'next/link';
import Button, { ButtonProps } from './Button';

export interface ButtonLinkProps extends ButtonProps {
    href: string;
    containerclassname?: string;
}

const ButtonLink = ({
    children,
    href,
    className,
    containerclassname,
    ...passProps
}: ButtonLinkProps) => {
    return (
        <NextLink href={href} className={containerclassname}>
            <Button {...passProps} className={className}>
                {children}
            </Button>
        </NextLink>
    );
};

export default ButtonLink;
