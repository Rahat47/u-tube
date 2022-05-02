import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import Head from 'next/head';
import { NotificationsProvider } from '@mantine/notifications';
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Utube &mdash; CloneTube</title>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0 minimum-scale=1'
                />
            </Head>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    colorScheme: 'light',
                }}
            >
                <NotificationsProvider>
                    <Component {...pageProps} />;
                </NotificationsProvider>
            </MantineProvider>
        </>
    );
}

export default MyApp;
