import { YOUTUBE_URL, FACEBOOK_URL, path } from '@/constants';
import { AiFillFacebook, AiFillYoutube } from 'react-icons/ai';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { IconType } from 'react-icons/lib';

interface ContactItemProps {
    Icon: IconType;
    href: string;
}

const Footer = () => {
    const { t } = useTranslation('footer');
    const footerLink =
        'font-bold hover:text-primary-300 transition duration-300';

    return (
        <footer className="flex w-full flex-col items-center justify-center space-y-4 border-t-[1px] border-black/10 px-4 py-16 dark:border-[#282828] md:px-12">
            <div className="flex items-center space-x-4">
                <ContactItem href={YOUTUBE_URL} Icon={AiFillYoutube} />
                <ContactItem href={FACEBOOK_URL} Icon={AiFillFacebook} />
            </div>

            <div className="flex items-center space-x-8 text-center">
                <Link href={path.tos} className={footerLink}>
                    {t('term_of_services')}
                </Link>

                <Link href={path.dmca} className={footerLink}>
                    {t('dmca')}
                </Link>

                <Link href={path.contact} className={footerLink}>
                    {t('contact')}
                </Link>

                <Link href={path.privacy} className={footerLink}>
                    {t('privacy_policy')}
                </Link>
            </div>

            <p className="text-responsive-sm text-center dark:text-gray-300">
                {t('disclaimer')}
            </p>

            <p className="text-center text-xs dark:text-gray-300">
                © 2023 SecondChance
            </p>
        </footer>
    );
};

const ContactItem: React.FC<ContactItemProps> = ({ Icon, href }) => {
    return (
        <a href={href} target="_blank" rel="noreferrer">
            <Icon className="h-[30px] w-[30px] transition duration-300 hover:text-primary-500" />
        </a>
    );
};

export default Footer;
