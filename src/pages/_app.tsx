import { AppPropsWithLayout } from '@/types/layoutTypes';
import nextI18nextConfig from 'next-i18next.config';
import { AnimatePresence, motion } from 'framer-motion';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from '@apollo/client';

import { useApollo } from '@/libs/apolloClient';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider, useAuthContext } from '@/contexts/AuthContext';
import BaseLayout from '@/components/layouts/BaseLayout';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
    const Layout =
        Component.Layout || ((page) => <BaseLayout>{page}</BaseLayout>);
    const router = useRouter();

    const apolloClient = useApollo(pageProps);

    const [loading, setLoading] = useState(true);
    const { checkAuth } = useAuthContext();

    useEffect(() => {
        const authenticate = async () => {
            await checkAuth();
            setLoading(false);
        };

        authenticate();
    }, [checkAuth]);

    if (loading) return <h1>LOADING....</h1>;

    return (
        <AuthProvider>
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
        </AuthProvider>
    );
};

export default appWithTranslation(App, nextI18nextConfig);
