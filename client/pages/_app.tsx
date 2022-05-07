import { useRef } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { NotificationsProvider } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppPropsWithLayout } from '../types';
import { UserContextProvider } from '../context/user';

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
                <ModalsProvider>
                    <NotificationsProvider position='top-right'>
                        <QueryClientProvider client={client}>
                            <UserContextProvider>
                                {getLayout(
                                    <main>
                                        <Component {...pageProps} />
                                    </main>
                                )}
                            </UserContextProvider>
                        </QueryClientProvider>
                    </NotificationsProvider>
                </ModalsProvider>
            </MantineProvider>
        </>
    );
}

export default MyApp;
