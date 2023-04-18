import { SettingsLayout } from '@/components/layouts';
import { ReactNode } from 'react';

const NotificationPage = () => {
    return <div className="">notification</div>;
};

// eslint-disable-next-line react/display-name
NotificationPage.Layout = (page: ReactNode) => (
    <SettingsLayout>{page}</SettingsLayout>
);

export default NotificationPage;
