import Head from '@/components/shared/Head';
import { useTranslation } from 'react-i18next';

const DmcaPage = () => {
    const { t } = useTranslation('dmca');
    return (
        <>
            <Head
                title="DMCA - SecondChance"
                description="DMCA for seconde chance"
            />
            <div className="wrapper py-[100px] space-y-12">
                <h1 className="text-4xl font-bold">{t('heading1')}</h1>
                <p>{t('description')}</p>

                <h4 className="text-4xl font-semibold">{t('heading2')}</h4>
                <ul className="px-4 list-inside list-disc">
                    <li>{t('item1')};</li>

                    <li>{t('item2')};</li>
                    <li>{t('item3')};</li>
                    <li>
                        {t('item4')}: <i>&quot; {t('desc_item4')};&quot;</i>;
                    </li>
                    <li>
                        {t('item5')}: <i>&quot;{t('desc_item5')}&quot;</i>;
                    </li>
                    <li>{t('item6')}.</li>
                </ul>
                <p></p>
                <p>
                    {t('heading3')}: <i>minhquan.lavo@gmail.com</i>
                </p>
                <p>{t('description_heading3')}.</p>
            </div>
        </>
    );
};

export default DmcaPage;
