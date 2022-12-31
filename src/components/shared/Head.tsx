import NextHead from 'next/head';

export interface HeadProps {
    title?: string;
    description?: string;
    image?: string;
    thumbnail?: string;
    url?: string;
}

export default function Head(props: HeadProps) {
    const { title, description, thumbnail, url } = props;
    return (
        <NextHead>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={thumbnail} />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={thumbnail} />
        </NextHead>
    );
}
