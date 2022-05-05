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

export enum QueryKeys {
    USER = 'user',
    VIDEOS = 'videos',
}

export interface User {
    _id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface Video {
    _id: string;
    title: string;
    description: string;
    published: boolean;
    owner: string;
    extension: string;
    videoId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface UploadVideoReturnType {
    _id: string;
    owner: string;
    extension: string;
    videoId: string;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateVideoPayload {
    videoId: string;
    title: string;
    description: string;
    published: boolean;
}

export interface UpdateVideoReturnType {
    message: string;
    data: Video;
}
