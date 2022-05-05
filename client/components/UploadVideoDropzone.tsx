import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import {
    Text,
    Group,
    Button,
    createStyles,
    MantineTheme,
    useMantineTheme,
    Progress,
} from '@mantine/core';
import { Dropzone, DropzoneStatus, MIME_TYPES } from '@mantine/dropzone';
import { CloudUpload } from 'tabler-icons-react';
import { useMutation } from 'react-query';
import { uploadVideo } from '../api';
import EditVideoForm from './EditVideoForm';

const useStyles = createStyles(theme => ({
    wrapper: {
        position: 'relative',
        marginBottom: 30,
    },

    dropzone: {
        borderWidth: 1,
        paddingBottom: 50,
    },

    icon: {
        color:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[3]
                : theme.colors.gray[4],
    },

    control: {
        position: 'absolute',
        width: 250,
        left: 'calc(50% - 125px)',
        bottom: -20,
    },
}));

function getActiveColor(status: DropzoneStatus, theme: MantineTheme) {
    return status.accepted
        ? theme.colors[theme.primaryColor][6]
        : status.rejected
        ? theme.colors.red[6]
        : theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.black;
}

function UploadVideoDropzone({
    setOpened,
}: {
    setOpened: Dispatch<SetStateAction<boolean>>;
}) {
    const [progress, setProgress] = useState(0);
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const openRef = useRef<() => void>();

    const mutation = useMutation(uploadVideo);
    const config = {
        onUploadProgress: (progressEvent: ProgressEvent) => {
            const { loaded, total } = progressEvent;
            setProgress(Math.round((loaded / total) * 100));
        },
    };

    const upload = (files: File[]) => {
        const formData = new FormData();

        files.forEach(file => {
            formData.append('video', file);
        });

        mutation.mutate({ payload: formData, config });
    };

    return (
        <>
            <div className={classes.wrapper}>
                <Dropzone
                    //@ts-ignore
                    openRef={openRef}
                    onDrop={upload}
                    className={classes.dropzone}
                    radius='md'
                    accept={[MIME_TYPES.mp4]}
                    multiple={false}
                    disabled={mutation.isSuccess}
                    // loading={mutation.status === 'loading'}
                    // loading
                >
                    {status => (
                        <div style={{ pointerEvents: 'none' }}>
                            <Group position='center'>
                                <CloudUpload
                                    size={50}
                                    color={getActiveColor(status, theme)}
                                />
                            </Group>
                            <Text
                                align='center'
                                weight={700}
                                size='lg'
                                mt='xl'
                                sx={{ color: getActiveColor(status, theme) }}
                            >
                                {status.accepted
                                    ? 'Drop files here'
                                    : status.rejected
                                    ? 'Invalid file type, please upload .mp4'
                                    : 'Upload Video'}
                            </Text>
                            <Text
                                align='center'
                                size='sm'
                                mt='xs'
                                color='dimmed'
                            >
                                Drag&apos;n&apos;drop videos here to upload. We
                                can accept only <i>.mp4</i> formats.
                            </Text>

                            {progress > 0 && (
                                <Progress
                                    mt={20}
                                    value={progress}
                                    size='xl'
                                    label={`${progress}%`}
                                />
                            )}
                        </div>
                    )}
                </Dropzone>

                <Button
                    className={classes.control}
                    size='md'
                    radius='xl'
                    onClick={() => openRef.current?.()}
                    loading={mutation.status === 'loading'}
                    disabled={mutation.isSuccess}
                >
                    Select Videos
                </Button>
            </div>

            {mutation.data && (
                <EditVideoForm
                    setOpened={setOpened}
                    videoId={mutation.data.videoId}
                />
            )}
        </>
    );
}

export default UploadVideoDropzone;
