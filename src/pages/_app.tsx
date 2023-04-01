import { AppPropsWithLayout } from '@/types/layoutTypes';
import nextI18nextConfig from 'next-i18next.config';
import { appWithTranslation } from 'next-i18next';
import NextNProgress from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from '@apollo/client';

import { useApollo } from '@/libs/apolloClient';
import { ThemeProvider } from '@/contexts/ThemeContext';
import BaseLayout from '@/components/layouts/BaseLayout';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
    const Layout =
        Component.Layout || ((page) => <BaseLayout>{page}</BaseLayout>);

    const apolloClient = useApollo(pageProps);

    return (
        <>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={true}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <ThemeProvider>
                <ApolloProvider client={apolloClient}>
                    {Layout(
                        <>
                            <NextNProgress color="#ef4444" />
                            <Component {...pageProps} />
                        </>,
                    )}
                </ApolloProvider>
            </ThemeProvider>
        </>
    );
};

export default appWithTranslation(App, nextI18nextConfig);
