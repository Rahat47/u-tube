import { NextPage } from 'next';
import { AppProps } from 'next/app';

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: React.ReactNode) => React.ReactNode;
};

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};
