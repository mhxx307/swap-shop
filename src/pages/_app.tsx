import '@/styles/globals.css';
import { SWRConfig } from 'swr';
import { AppPropsWithLayout } from '@/types/layoutTypes';
import BaseLayout from '@/components/layouts/BaseLayout';
import httpRequest from '@/utils/httpRequest';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const Layout =
        Component.Layout || ((page) => <BaseLayout>{page}</BaseLayout>);
    return (
        <SWRConfig
            value={{
                fetcher: (url) => httpRequest.get(url),
                shouldRetryOnError: false,
            }}
        >
            {Layout(<Component {...pageProps} />)}
        </SWRConfig>
    );
}
