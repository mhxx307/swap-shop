import '@/styles/globals.css';
import { SWRConfig } from 'swr';
import { AppPropsWithLayout } from '@/types/layoutTypes';
import BaseLayout from '@/components/layouts/BaseLayout';
import httpRequest from '@/utils/httpRequest';
import { appWithTranslation } from 'next-i18next';
import nextI18nextConfig from 'next-i18next.config';
import ThemeProvider from '@/contexts/ThemeContext';

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
    const Layout =
        Component.Layout || ((page) => <BaseLayout>{page}</BaseLayout>);
    return (
        <ThemeProvider>
            <SWRConfig
                value={{
                    fetcher: (url) => httpRequest.get(url),
                    shouldRetryOnError: false,
                }}
            >
                {Layout(<Component {...pageProps} />)}
            </SWRConfig>
        </ThemeProvider>
    );
};

// @ts-ignore
export default appWithTranslation(App, nextI18nextConfig);
