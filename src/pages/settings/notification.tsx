import { SettingsLayout } from '@/components/layouts';

const NotificationPage = () => {
    return <div className="">notification</div>;
};

// eslint-disable-next-line react/display-name
NotificationPage.Layout = (page: any) => (
    <SettingsLayout>{page}</SettingsLayout>
);

export default NotificationPage;
