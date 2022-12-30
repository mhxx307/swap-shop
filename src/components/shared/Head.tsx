import NextHead from 'next/head';

export interface HeadProps {
    title?: string;
    description?: string;
    image?: string;
}

export default function Head(props: HeadProps) {
    const { title, description } = props;
    return (
        <NextHead>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
        </NextHead>
    );
}
