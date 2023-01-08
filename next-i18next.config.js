const HttpBackend = require('i18next-http-backend/cjs');
const ChainedBackend = require('i18next-chained-backend').default;
const LocalStorageBackend = require('i18next-localstorage-backend').default;

const isDev = process.env.NODE_ENV === 'development';

// all side optimize
// https://locize.com/blog/next-i18next/
module.exports = {
    backend: {
        backendOptions: [
            { expirationTime: isDev ? 60 : 7 * 24 * 60 * 60 * 1000 },
        ], //  7 days
        backends:
            typeof window !== 'undefined'
                ? [LocalStorageBackend, HttpBackend]
                : [],
    },
    i18n: {
        locales: ['en', 'vi'],
        defaultLocale: 'en',
        reloadOnPrerender: isDev,
        load: 'currentOnly',
        debug: isDev,
    },
    serializeConfig: false,
    use: typeof window !== 'undefined' ? [ChainedBackend] : [],
};
// https://github.com/i18next/next-i18next/issues/1679
