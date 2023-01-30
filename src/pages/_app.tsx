import '@/styles/globals.css';
import { SWRConfig } from 'swr';
import { AppPropsWithLayout } from '@/types/layoutTypes';
import BaseLayout from '@/components/layouts/BaseLayout';
import httpRequest from '@/utils/httpRequest';
import { appWithTranslation } from 'next-i18next';
import nextI18nextConfig from 'next-i18next.config';
import ThemeProvider from '@/contexts/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
    const Layout =
        Component.Layout || ((page) => <BaseLayout>{page}</BaseLayout>);
    const router = useRouter();
    return (
        <ThemeProvider>
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
                                duration: 0.75,
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
                            <Component {...pageProps} />
                        </motion.div>
                    </AnimatePresence>,
                )}
            </SWRConfig>
        </ThemeProvider>
    );
};

// @ts-ignore
export default appWithTranslation(App, nextI18nextConfig);
