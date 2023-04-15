import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { toast } from 'react-toastify';

import { BaseLayout } from '@/components/layouts';
import { Button, Rejected } from '@/components/shared';
import {
    useVerifyEmailMutation,
    useMeQuery,
    MeQuery,
    MeDocument,
} from '@/generated/graphql';
import { path } from '@/constants';

const VerifyPage = () => {
    const router = useRouter();
    const {
        query: { userId, token },
    } = router;

    const { refetch } = useMeQuery();

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
                    toast.success('Verify email success!');
                },
                update(cache, { data }) {
                    if (data?.verifyEmail.success) {
                        cache.writeQuery<MeQuery>({
                            query: MeDocument,
                            data: { me: data.verifyEmail.user },
                        });
                    }
                    router.push(path.home);
                },
            });
        } else {
            toast.error('You do not have token!');
        }
    };

    return (
        <Rejected>
            <section className="bg-gray-50 dark:bg-primaryDark">
                <Button secondary isLoading={loading} onClick={handleVerify}>
                    Xác thực tài khoản
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
