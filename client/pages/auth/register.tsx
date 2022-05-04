import React from 'react';
import Head from 'next/head';
import { AxiosError } from 'axios';
import {
    Button,
    Container,
    Stack,
    Paper,
    PasswordInput,
    TextInput,
    Title,
    Text,
    Checkbox,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

import { useMutation } from 'react-query';
import { registerUser } from '../../api';
import { RegisterUserReturnType } from '../../types';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import Link from 'next/link';

const schema = z
    .object({
        email: z.string().email('Must be a valid email address'),
        username: z.string().min(3).max(20),
        password: z.string().min(6).max(64),
        confirmPassword: z.string().min(6).max(64),
        terms: z.boolean(),
    })
    .refine(data => data.password === data.confirmPassword);

const RegisterPage = () => {
    const router = useRouter();

    const form = useForm({
        schema: zodResolver(schema),
        initialValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            terms: false,
        },
    });

    const mutation = useMutation<
        RegisterUserReturnType,
        AxiosError<any>,
        Parameters<typeof registerUser>[0]
    >(registerUser, {
        onMutate: () => {
            showNotification({
                id: 'register-user',
                title: 'Creating Account',
                message: 'Creating your account...',
                loading: true,
            });
        },
        onSuccess: () => {
            updateNotification({
                id: 'register-user',
                title: 'Account Created',
                message: `Your account has been created. You can now log in.`,
                loading: false,
            });
            form.reset();
            router.push('/auth/login');
        },
        onError: error => {
            updateNotification({
                id: 'register-user',
                title: 'Error',
                message:
                    error?.response?.data?.message || 'Something went wrong :(',
                loading: false,
                color: 'red',
            });
        },
    });

    return (
        <>
            <Head>
                <title>Register User</title>
            </Head>

            <Container py={40} size='xs'>
                <Title align='center'>Welcome to Utube, Please Register</Title>
                <Paper shadow='md' p={30} mt={30} radius='md' withBorder>
                    <Text color='dimmed' size='sm' align='center' mt={5}>
                        Already have an account?{' '}
                        <Link href='/auth/login'>Login Now</Link>
                    </Text>
                    <form
                        onSubmit={form.onSubmit(values =>
                            mutation.mutate(values)
                        )}
                    >
                        <Stack>
                            <TextInput
                                required
                                label='Username'
                                placeholder='Your username'
                                {...form.getInputProps('username')}
                            />

                            <TextInput
                                required
                                label='Email'
                                placeholder='hello@email.dev'
                                {...form.getInputProps('email')}
                            />

                            <PasswordInput
                                required
                                label='Password'
                                placeholder='Your password'
                                {...form.getInputProps('password')}
                            />

                            <PasswordInput
                                required
                                label='Confirm Password'
                                placeholder='Confirm your password'
                                {...form.getInputProps('confirmPassword')}
                            />
                            <Checkbox
                                label='I accept terms and conditions'
                                {...form.getInputProps('terms')}
                            />

                            <Button loading={mutation.isLoading} type='submit'>
                                Register
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </>
    );
};

export default RegisterPage;
