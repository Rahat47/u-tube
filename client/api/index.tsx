import axios from 'axios';
import {
    LoginUserReturnType,
    LoginUserType,
    RegisterUserReturnType,
    RegisterUserType,
} from '../types';

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const userBase = `${base}/api/v1/users`;

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
