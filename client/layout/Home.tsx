import {
    Anchor,
    AppShell,
    Box,
    createStyles,
    Header,
    Navbar,
} from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { NavbarComp } from '../components/Navbar';
import UploadVideo from '../components/UploadVideo';
import { useMe } from '../context/user';

const useStyles = createStyles(() => ({
    flex: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    imageBox: {
        flex: 1,
    },
}));

const HomePageLayout = ({ children }: { children: ReactNode }) => {
    const { classes } = useStyles();
    const { user, refetch } = useMe();

    return (
        <AppShell
            padding='md'
            navbar={<NavbarComp />}
            header={
                <Header height={80} p='xs'>
                    <Box className={classes.flex}>
                        <Box className={classes.imageBox}>
                            <Image
                                src='/logo.png'
                                alt='logo'
                                width={100}
                                height={40}
                            />
                        </Box>
                        {!user && (
                            <>
                                <Link href='/auth/login' passHref>
                                    <Anchor ml='lg' mr='lg'>
                                        Login
                                    </Anchor>
                                </Link>
                                <Link href='/auth/register' passHref>
                                    <Anchor ml='lg' color='primary'>
                                        Register
                                    </Anchor>
                                </Link>
                            </>
                        )}

                        {user && <UploadVideo />}
                    </Box>
                </Header>
            }
        >
            {children}
        </AppShell>
    );
};

export default HomePageLayout;
