import '@/styles/globals.css';
import { AppPropsWithLayout } from '@/types/layoutTypes';
import { AnimatePresence, motion } from 'framer-motion';
import { appWithTranslation } from 'next-i18next';
import nextI18nextConfig from 'next-i18next.config';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BaseLayout from '@/components/layouts/BaseLayout';
import ThemeProvider from '@/contexts/ThemeContext';
import { useApollo } from '@/libs/apolloClient';
import { ApolloProvider } from '@apollo/client';

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
    const Layout =
        Component.Layout || ((page) => <BaseLayout>{page}</BaseLayout>);
    const router = useRouter();

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
                </ApolloProvider>
            </ThemeProvider>
        </>
    );
};

// @ts-ignore
export default appWithTranslation(App, nextI18nextConfig);
