import { Text, useMantineTheme } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { showNotification, updateNotification } from '@mantine/notifications';
import { logoutHandler } from '../api';
import { useMe } from '../context/user';
import { useVideo } from '../context/videos';

export const useLogout = () => {
    const modals = useModals();
    const theme = useMantineTheme();
    const { refetch } = useMe();
    const { refetch: videoRefetch } = useVideo();

    const logout = () =>
        modals.openConfirmModal({
            title: 'Are you sure you want to logout?',
            children: (
                <Text size='sm'>
                    You will be logged out of the application and redirected to
                    the login page. You will not be able to access the
                    application until you login again.
                </Text>
            ),
            labels: { confirm: 'Confirm', cancel: 'Cancel' },
            onCancel: () => console.log('Cancel'),
            onConfirm: async () => {
                showNotification({
                    id: 'logout-notification',
                    title: 'Logging out...',
                    message: 'Logging you out...',
                    loading: true,
                });

                await logoutHandler();

                updateNotification({
                    id: 'logout-notification',
                    title: 'Logged out',
                    message: 'You have been logged out.',
                    loading: false,
                    color: theme.colors.green[6],
                });

                refetch();
                videoRefetch();
            },
        });

    return { logout };
};
