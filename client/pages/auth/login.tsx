import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification, updateNotification } from '@mantine/notifications';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { loginUser } from '../../api';
import { LoginUserReturnType } from '../../types';

function LoginPage() {
    const router = useRouter();

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
    });

    const mutation = useMutation<
        LoginUserReturnType,
        AxiosError<any>,
        Parameters<typeof loginUser>[0]
    >(loginUser, {
        onMutate: () => {
            showNotification({
                id: 'login-user',
                title: 'Logging in',
                message: 'Logging you in...',
                loading: true,
            });
        },
        onSuccess: () => {
            updateNotification({
                id: 'login-user',
                title: 'Logged in',
                message: 'You are now logged in',
            });
            router.push('/');
        },
        onError: error => {
            updateNotification({
                id: 'login-user',
                title: 'Error',
                message:
                    error?.response?.data?.message || 'Something went wrong :(',
            });
        },
    });
    return (
        <Container size={420} my={40}>
            <Title
                align='center'
                sx={theme => ({
                    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                    fontWeight: 900,
                })}
            >
                Welcome back!
            </Title>
            <Text color='dimmed' size='sm' align='center' mt={5}>
                Do not have an account yet?{' '}
                <Link href='/auth/register'>Create account</Link>
            </Text>

            <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
                <form onSubmit={form.onSubmit(val => mutation.mutate(val))}>
                    <TextInput
                        label='Email'
                        placeholder='you@email.com'
                        required
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        label='Password'
                        placeholder='Your password'
                        required
                        mt='md'
                        {...form.getInputProps('password')}
                    />
                    <Group position='apart' mt='md'>
                        <Checkbox label='Remember me' />
                        <Anchor<'a'>
                            onClick={event => event.preventDefault()}
                            href='#'
                            size='sm'
                        >
                            Forgot password?
                        </Anchor>
                    </Group>
                    <Button
                        fullWidth
                        mt='xl'
                        type='submit'
                        loading={mutation.isLoading}
                    >
                        Sign in
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default LoginPage;
