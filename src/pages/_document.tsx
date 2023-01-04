import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    const isDark = true;
    return (
        <Html lang="en" className={`${isDark && 'dark'}`}>
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
