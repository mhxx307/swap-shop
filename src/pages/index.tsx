import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Head>
                <title>swap shop</title>
                <meta
                    name="description"
                    content="swap shop - a place to swap your stuff"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <h1 className="text-[1.6rem]">Hello</h1>
            </main>
        </>
    );
}
