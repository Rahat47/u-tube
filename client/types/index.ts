import { NextPage } from 'next';
import { AppProps } from 'next/app';

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: React.ReactNode) => React.ReactNode;
};

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export type RegisterUserType = {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
};

export type RegisterUserReturnType = {
    message: string;
    data: {
        _id: string;
        username: string;
        email: string;
        createdAt: string;
        updatedAt: string;
    };
};

export type LoginUserType = {
    email: string;
    password: string;
};

export type LoginUserReturnType = {
    message: string;
    data: {
        token: string;
        user: RegisterUserReturnType['data'];
    };
};
