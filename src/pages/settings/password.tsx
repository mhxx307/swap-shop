import { SettingsLayout } from '@/components/layouts';

export interface IPasswordPageProps {}

const PasswordPage = (props: IPasswordPageProps) => {
    return <div>password</div>;
};

// eslint-disable-next-line react/display-name
PasswordPage.Layout = (page: any) => <SettingsLayout>{page}</SettingsLayout>;

export default PasswordPage;
