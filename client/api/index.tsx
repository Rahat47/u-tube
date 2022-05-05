import axios from 'axios';
import {
    GetVideosReturnType,
    LoginUserReturnType,
    LoginUserType,
    RegisterUserReturnType,
    RegisterUserType,
    UpdateVideoPayload,
    UpdateVideoReturnType,
    UploadVideoReturnType,
    Video,
} from '../types';

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const userBase = `${base}/api/v1/users`;
const videoBase = `${base}/api/v1/videos`;

export const registerUser = async (payload: RegisterUserType) => {
    const res = await axios.post<RegisterUserReturnType>(userBase, payload);
    return res.data;
};

export const loginUser = async (payload: LoginUserType) => {
    const res = await axios.post<LoginUserReturnType>(
        `${base}/api/v1/auth`,
        payload,
        { withCredentials: true }
    );
    return res.data;
};

export const getMe = async () => {
    try {
        const res = await axios.get(`${userBase}/me`, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        return null;
    }
};

export const uploadVideo = async ({
    payload,
    config,
}: {
    payload: FormData;
    config: {
        onUploadProgress: (progressEvent: ProgressEvent) => void;
    };
}) => {
    const res = await axios.post<UploadVideoReturnType>(videoBase, payload, {
        withCredentials: true,
        ...config,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};

export const updateVideo = async ({
    videoId,
    ...payload
}: UpdateVideoPayload) => {
    const res = await axios.patch<UpdateVideoReturnType>(
        `${videoBase}/${videoId}`,
        payload,
        {
            withCredentials: true,
        }
    );

    return res.data;
};

export const getVideos = async () => {
    const res = await axios.get<GetVideosReturnType>(`${videoBase}`, {
        withCredentials: true,
    });
    return res.data;
};
