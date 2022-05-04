import { useState } from 'react';
import { Button, Modal, MODAL_SIZES, useMantineTheme } from '@mantine/core';
import UploadVideoDropzone from './UploadVideoDropzone';

const UploadVideo = () => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    const onClose = () => {
        setOpened(false);
    };

    return (
        <>
            <Modal
                opened={opened}
                closeOnClickOutside={false}
                onClose={onClose}
                title='Upload Video'
                size={MODAL_SIZES.xl}
                overlayColor={
                    theme.colorScheme === 'dark'
                        ? theme.colors.dark[9]
                        : theme.colors.gray[2]
                }
                overlayOpacity={0.55}
                overlayBlur={3}
            >
                <UploadVideoDropzone />
            </Modal>

            <Button onClick={() => setOpened(true)}>Upload Video</Button>
        </>
    );
};

export default UploadVideo;
