import {
    Button,
    Checkbox,
    Stack,
    Switch,
    Textarea,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { AxiosError } from 'axios';
import type { Dispatch, FC, SetStateAction } from 'react';
import { useMutation } from 'react-query';
import { updateVideo } from '../api';
import { useVideo } from '../context/videos';
import { UpdateVideoReturnType } from '../types';

interface Props {
    videoId: string;
    setOpened: Dispatch<SetStateAction<boolean>>;
}

const EditVideoForm: FC<Props> = ({ videoId, setOpened }) => {
    const { refetch } = useVideo();

    const form = useForm({
        initialValues: {
            title: '',
            description: '',
            published: true,
        },
    });

    const mutation = useMutation<
        UpdateVideoReturnType,
        AxiosError,
        Parameters<typeof updateVideo>[0]
    >(updateVideo, {
        onSuccess: () => {
            setOpened(false);
            refetch();
        },
    });

    return (
        <form
            onSubmit={form.onSubmit(vals =>
                mutation.mutate({ videoId, ...vals })
            )}
        >
            <Stack>
                <TextInput
                    label='Title'
                    required
                    placeholder='Enter video title'
                    {...form.getInputProps('title')}
                />

                <Textarea
                    label='Description'
                    required
                    placeholder='Enter video description'
                    {...form.getInputProps('description')}
                />

                <Checkbox
                    label='Published'
                    {...form.getInputProps('published')}
                />

                <Button loading={mutation.isLoading} type='submit'>
                    Save
                </Button>
            </Stack>
        </form>
    );
};

export default EditVideoForm;
