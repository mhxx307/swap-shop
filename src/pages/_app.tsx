import '@/styles/globals.css';
import { SWRConfig } from 'swr';
import { AppPropsWithLayout } from '@/types/layoutTypes';
import httpRequest from '@/utils/httpRequest';
import { appWithTranslation } from 'next-i18next';
import nextI18nextConfig from 'next-i18next.config';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';

import BaseLayout from '@/components/layouts/BaseLayout';
import ThemeProvider from '@/contexts/ThemeContext';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    credentials: 'include',
});

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
    const Layout =
        Component.Layout || ((page) => <BaseLayout>{page}</BaseLayout>);
    const router = useRouter();

    return (
        <ThemeProvider>
            <ApolloProvider client={client}>
                <SWRConfig
                    value={{
                        fetcher: (url) => httpRequest.get(url),
                        shouldRetryOnError: false,
                    }}
                >
                    {Layout(
                        <AnimatePresence>
                            <motion.div
                                key={router.route}
                                initial="initialState"
                                animate="animateState"
                                exit="exitState"
                                transition={{
                                    duration: 0.5,
                                }}
                                variants={{
                                    initialState: {
                                        opacity: 0,
                                    },
                                    animateState: {
                                        opacity: 1,
                                    },
                                    exitState: {},
                                }}
                            >
                                <NextNProgress color="#ef4444" />
                                <Component {...pageProps} />
                            </motion.div>
                        </AnimatePresence>,
                    )}
                </SWRConfig>
            </ApolloProvider>
        </ThemeProvider>
    );
};

// @ts-ignore
export default appWithTranslation(App, nextI18nextConfig);
