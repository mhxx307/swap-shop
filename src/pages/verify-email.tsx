import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { toast } from 'react-toastify';

import { BaseLayout } from '@/components/layouts';
import { Button, Rejected } from '@/components/shared';
import { useVerifyEmailMutation } from '@/generated/graphql';
import { useTranslation } from 'react-i18next';

const VerifyPage = () => {
    const router = useRouter();
    const {
        query: { userId, token },
    } = router;
    const { t } = useTranslation('common');

    const [verifyEmail, { loading }] = useVerifyEmailMutation();

    const handleVerify = async () => {
        if (token && userId) {
            await verifyEmail({
                variables: {
                    token: token as string,
                    userId: userId as string,
                },
                onError: (error) => {
                    toast.error(error.message);
                },
                onCompleted: () => {
                    toast.success(
                        t('verify_success') || 'Verify email success!',
                    );
                    router.push('/login');
                },
            });
        } else {
            toast.error(t('not_have_token') || 'You do not have token!');
        }
    };

    return (
        <Rejected>
            <section className="flex-center h-screen w-full bg-gray-50 dark:bg-primaryDark">
                <Button secondary isLoading={loading} onClick={handleVerify}>
                    {t('verify')}
                </Button>
            </section>
        </Rejected>
    );
};

export default VerifyPage;

// eslint-disable-next-line react/display-name
VerifyPage.Layout = (page: ReactNode) => (
    <BaseLayout showFooter={false} showHeader={false}>
        {page}
    </BaseLayout>
);
