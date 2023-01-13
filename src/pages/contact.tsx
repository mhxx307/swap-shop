import emailjs from '@emailjs/browser';
import classNames from 'classnames';
import { AiFillFacebook } from 'react-icons/ai';
import { createRef, useState } from 'react';

import { Head, Button, Input } from '@/components/shared';
import { FACEBOOK_URL } from '@/constants';
import { useTranslation } from 'react-i18next';

const ContactPage = () => {
    const formRef = createRef<HTMLFormElement>();
    const nameRef = createRef<HTMLInputElement>();
    const emailRef = createRef<HTMLInputElement>();
    const messageRef = createRef<HTMLTextAreaElement>();
    const subjectRef = createRef<HTMLInputElement>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const EMAILJS_SERVICE = process.env.NEXT_PUBLIC_EMAILJS_SERVICE;
    const EMAILJS_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE;
    const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    const { t } = useTranslation('contact');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        console.log('submit');
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
                        (result) => {
                            console.log(result.text);
                            emailRef.current!.value = '';
                            nameRef.current!.value = '';
                            subjectRef.current!.value = '';
                            messageRef.current!.value = '';
                            nameRef.current!.focus();
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
                title={t('head_title')!}
                description={t('head_description')!}
            />

            <div className="wrapper pt-[100px] space-y-9">
                <h1 className="text-2xl font-bold">{t('contact')}</h1>

                <p className="text-2xl">{t('heading1')}</p>

                <div className="flex items-center space-x-4">
                    <ContactItem
                        Icon={AiFillFacebook}
                        name="Facebook"
                        href={FACEBOOK_URL}
                        iconContainerClassName="bg-[#007bff]"
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
                            ref={nameRef}
                            type="text"
                            placeholder={t('name')!}
                            name="user_name"
                            label={t('name')!}
                            className="p-[5px]"
                            containerInputClassName="register-input"
                        />
                        <Input
                            ref={subjectRef}
                            type="text"
                            placeholder={t('subject')!}
                            name="user_subject"
                            label={t('subject')!}
                            className="p-[5px]"
                            containerInputClassName="register-input"
                        />
                        <Input
                            ref={emailRef}
                            type="email"
                            placeholder="Email"
                            name="user_email"
                            label={t('email')!}
                            className="p-[5px]"
                            containerInputClassName="register-input"
                        />
                        <textarea
                            ref={messageRef}
                            rows={5}
                            placeholder={t('message')!}
                            name="message"
                            className="w-full p-5 rounded-md text-black border border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                        <Button
                            primary
                            type="submit"
                            className="px-[20px]"
                            isLoading={isLoading}
                        >
                            {t('send')}
                        </Button>
                        {!isLoading && (
                            <span>Thanks, I&apos;ll reply ASAP</span>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
};

type ContactItemProps = {
    Icon: React.ComponentType<any>;
    name: string;
    iconContainerClassName?: string;
    href: string;
};

const ContactItem: React.FC<ContactItemProps> = ({
    Icon,
    name,
    iconContainerClassName,
    href,
}) => {
    return (
        <a href={href} target="_blank" rel="noreferrer">
            <div className="flex items-center rounded-full bg-gray-300 dark:bg-gray-800 p-2">
                <div
                    className={classNames(
                        'p-[16px] rounded-full',
                        iconContainerClassName,
                    )}
                >
                    <Icon className="w-[24px] h-[24px] text-white" />
                </div>
                <p className="px-4">{name}</p>
            </div>
        </a>
    );
};

export default ContactPage;
