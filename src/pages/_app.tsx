import '@/styles/globals.css';
import BaseLayout from '@/components/layouts/BaseLayout';
import { AppPropsWithLayout } from '@/types/layoutTypes';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const Layout =
        Component.Layout || ((page) => <BaseLayout>{page}</BaseLayout>);
    return Layout(<Component {...pageProps} />);
}
