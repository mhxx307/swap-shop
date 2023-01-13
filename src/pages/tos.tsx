import Head from '@/components/shared/Head';
import { useTranslation } from 'react-i18next';

const TosPage = () => {
    const { t } = useTranslation('tos');
    return (
        <>
            <Head
                title={t('head_title')!}
                description={
                    t('head_description')!
                }
            />

            <div className="wrapper py-[100px] space-y-9">
                <h1 className="text-4xl font-bold">{t('title')}</h1>

                <h4 className="text-2xl font-semibold">1. {t('heading1')}</h4>
                <p className="text-[1.4rem]">{t('heading1_paragraph_1')}</p>
                <p className="text-[1.4rem]">{t('heading1_paragraph_2')}</p>
                <p className="text-[1.4rem]">{t('heading1_paragraph_3')}</p>

                <h4 className="text-2xl font-semibold">2. {t('heading2')}</h4>
                <p className="text-[1.4rem]">{t('heading2_paragraph_1')}</p>
                <p className="text-[1.4rem]">{t('heading2_paragraph_2')}</p>

                <h4 className="text-2xl font-semibold">3. {t('heading3')}</h4>
                <p className="text-[1.4rem]">{t('heading3_paragraph_1')}</p>

                <h4 className="text-2xl font-semibold">4. {t('heading4')}</h4>
                <p className="text-[1.4rem]">{t('heading4_paragraph_1')}</p>
                <ul className="list-inside">
                    <li>- {t('heading4_paragraph_2')}</li>
                    <li>- {t('heading4_paragraph_3')}</li>
                    <li>- {t('heading4_paragraph_4')}</li>
                </ul>

                <h4 className="text-2xl font-semibold">5. {t('heading5')}</h4>
                <p className="text-[1.4rem]">{t('heading5_paragraph_1')}</p>
                <p className="text-[1.4rem]">{t('heading5_paragraph_2')}</p>
                <p className="text-[1.4rem]">{t('heading5_paragraph_3')}</p>
                <p className="text-[1.4rem]">{t('heading5_paragraph_4')}</p>

                <h4 className="text-2xl font-semibold">6. {t('heading6')}</h4>
                <p className="text-[1.4rem]">{t('heading6_paragraph_1')}</p>
                <p className="text-[1.4rem]">{t('heading6_paragraph_2')}</p>
                <p className="text-[1.4rem]">{t('heading6_paragraph_3')}</p>

                <h4 className="text-2xl font-semibold">7. {t('heading7')}</h4>
                <p className="text-[1.4rem]">{t('heading7_paragraph_1')}</p>
                <p className="text-[1.4rem]">{t('heading7_paragraph_2')}</p>

                <h4 className="text-2xl font-semibold">8. {t('heading8')}</h4>
                <p className="text-[1.4rem]">{t('heading8_paragraph_1')}</p>

                <h4 className="text-2xl font-semibold">{t('contact')}</h4>
                <p className="text-[1.4rem]">{t('contact_paragraph')}</p>
            </div>
        </>
    );
};

export default TosPage;
