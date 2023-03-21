import emailjs from '@emailjs/browser';
import classNames from 'classnames';
import { AiFillFacebook } from 'react-icons/ai';
import { createRef, useState } from 'react';

import { Head, Button, Input } from '@/components/shared';
import { FACEBOOK_URL } from '@/constants';
import { useTranslation } from 'react-i18next';
import { IconType } from 'react-icons/lib';

const ContactPage = () => {
    const formRef = createRef<HTMLFormElement>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const EMAILJS_SERVICE = process.env.NEXT_PUBLIC_EMAILJS_SERVICE;
    const EMAILJS_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE;
    const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    const { t } = useTranslation('contact');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        if (formRef.current) {
            if (EMAILJS_SERVICE && EMAILJS_TEMPLATE && EMAILJS_PUBLIC_KEY) {
                emailjs
                    .sendForm(
                        EMAILJS_SERVICE,
                        EMAILJS_TEMPLATE,
                        formRef.current,
                        EMAILJS_PUBLIC_KEY,
                    )
                    .then(
                        (_result) => {
                            setIsLoading(false);
                        },
                        (error) => {
                            console.log(error.text);
                        },
                    );
            }
        }
    };

    return (
        <>
            <Head
                title={t('head_title') && 'Contact'}
                description={t('head_description') && 'Contact'}
            />

            <div className="wrapper header-height space-y-6">
                <h1 className="text-xl font-bold">{t('contact')}</h1>

                <p className="text-lg">{t('heading1')}</p>

                <div className="flex items-center space-x-4">
                    <ContactItem
                        Icon={AiFillFacebook}
                        name="Facebook"
                        href={FACEBOOK_URL}
                        iconclassNameWrapper="bg-[#007bff]"
                    />
                </div>

                <div className="space-y-4">
                    <p>{t('heading2')}</p>
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="w-[400px] space-y-8 pb-[30px]"
                    >
                        <Input
                            type="text"
                            placeholder={t('name') && 'Username'}
                            name="user_name"
                            label={t('name') && 'Username:'}
                            className="p-[5px]"
                            containerInputClassName="default-input"
                        />
                        <Input
                            type="text"
                            placeholder={t('subject') && 'Subject'}
                            name="user_subject"
                            label={t('subject') && 'Subject'}
                            className="p-[5px]"
                            containerInputClassName="default-input"
                        />
                        <Input
                            type="email"
                            placeholder="Email"
                            name="user_email"
                            label={t('email') && 'Email'}
                            className="p-[5px]"
                            containerInputClassName="default-input"
                        />
                        <textarea
                            rows={5}
                            placeholder={t('message') && 'Message'}
                            name="message"
                            className="w-full rounded-md border border-gray-300 p-5 text-black focus:border-blue-500 focus:outline-none"
                        />
                        <Button
                            primary
                            type="submit"
                            className="px-[20px]"
                            isLoading={isLoading}
                        >
                            {t('send')}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};

interface ContactItemProps {
    Icon: IconType;
    name: string;
    iconclassNameWrapper?: string;
    href: string;
}

const ContactItem = ({
    Icon,
    name,
    iconclassNameWrapper,
    href,
}: ContactItemProps) => {
    return (
        <a href={href} target="_blank" rel="noreferrer">
            <div className="flex items-center rounded-full bg-gray-300 p-2 dark:bg-gray-800">
                <div
                    className={classNames(
                        'rounded-full p-[16px]',
                        iconclassNameWrapper,
                    )}
                >
                    <Icon className="h-[24px] w-[24px] text-white" />
                </div>
                <p className="px-4">{name}</p>
            </div>
        </a>
    );
};

export default ContactPage;
