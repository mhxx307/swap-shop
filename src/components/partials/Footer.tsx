import { YOUTUBE_URL, FACEBOOK_URL } from '@/constants';
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
        <div className="w-full flex flex-col items-center justify-center px-4 md:px-12 py-16 space-y-4 border-t-[1px]">
            <div className="flex items-center space-x-4">
                <ContactItem href={YOUTUBE_URL} Icon={AiFillYoutube} />
                <ContactItem href={FACEBOOK_URL} Icon={AiFillFacebook} />
            </div>

            <div className="flex items-center space-x-8 text-center">
                <Link href="/tos" className={footerLink}>
                    <p className="text-responsive-md">
                        {t('term_of_services')}
                    </p>
                </Link>

                <Link href="/dmca" className={footerLink}>
                    <p className="text-responsive-md">{t('dmca')}</p>
                </Link>

                <Link href="/contact" className={footerLink}>
                    <p className="text-responsive-md">{t('contact')}</p>
                </Link>

                <Link href="/privacy" className={footerLink}>
                    <p className="text-responsive-md">{t('privacy_policy')}</p>
                </Link>
            </div>

            <p className="text-[1rem] sm:text-[1.2rem] md:text-[1.4rem] dark:text-gray-300 text-center">
                {t('disclaimer')}
            </p>

            <p className="text-[1.4rem] dark:text-gray-300 text-center">
                © 2023 SecondChance
            </p>
        </div>
    );
};

const ContactItem: React.FC<ContactItemProps> = ({ Icon, href }) => {
    return (
        <a href={href} target="_blank" rel="noreferrer">
            <Icon className="w-[30px] h-[30px] hover:text-primary-500 transition duration-300" />
        </a>
    );
};

export default Footer;
