import { MantineProvider } from '@mantine/core';
import Head from 'next/head';
import { NotificationsProvider } from '@mantine/notifications';
import { AppPropsWithLayout } from '../types';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { useRef } from 'react';
import Router from 'next/router';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout || (page => page);
    const ref = useRef<LoadingBarRef>(null);

    Router.events.on('routeChangeStart', () => {
        if (ref.current) {
            ref.current.continuousStart(0, 100);
        }
    });

    Router.events.on('routeChangeComplete', () => {
        if (ref.current) {
            ref.current.complete();
        }
    });

    Router.events.on('routeChangeError', () => {
        if (ref.current) {
            ref.current.complete();
        }
    });

    return (
        <>
            <LoadingBar color='#f44336' ref={ref} />

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
                    colorScheme: 'dark',
                }}
            >
                <NotificationsProvider>
                    {getLayout(
                        <main>
                            <Component {...pageProps} />
                        </main>
                    )}
                </NotificationsProvider>
            </MantineProvider>
        </>
    );
}

export default MyApp;
