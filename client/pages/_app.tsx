import { useRef } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { MantineProvider } from '@mantine/core';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { NotificationsProvider } from '@mantine/notifications';
import { AppPropsWithLayout } from '../types';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

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
                <NotificationsProvider position='top-right'>
                    <QueryClientProvider client={client}>
                        {getLayout(
                            <main>
                                <Component {...pageProps} />
                            </main>
                        )}
                    </QueryClientProvider>
                </NotificationsProvider>
            </MantineProvider>
        </>
    );
}

export default MyApp;
