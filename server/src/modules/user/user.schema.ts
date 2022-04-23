import { object, string, TypeOf } from 'zod';

export const registerUserSchema = {
    body: object({
        username: string({
            description: 'Username of the user, must be unique',
            required_error: 'Username is required',
        }),
        email: string({
            description: 'Email of the user, must be unique',
            required_error: 'Email is required',
        }).email('Email is not valid'),
        password: string({
            required_error: 'Password is required',
        })
            .min(6, 'Password must be at least 6 characters long')
            .max(69, 'Password must be at most 69 characters long'),
        confirmPassword: string({
            required_error: 'Password Confirm is required',
        }),
    }).refine(
        (data) => data.password === data.confirmPassword,
        'Password and Confirm Password must match'
    ),
};

export type RegisterUserSchema = TypeOf<typeof registerUserSchema.body>;
