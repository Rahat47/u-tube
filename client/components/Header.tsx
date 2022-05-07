import React, { useState } from 'react';
import {
    createStyles,
    Container,
    Avatar,
    UnstyledButton,
    Group,
    Text,
    Menu,
    Divider,
    Burger,
    Button,
    Stack,
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import {
    Logout,
    Heart,
    Star,
    Message,
    Settings,
    PlayerPause,
    Trash,
    SwitchHorizontal,
    ChevronDown,
    Upload,
} from 'tabler-icons-react';
import Image from 'next/image';
import { NextLink } from '@mantine/next';
import { useLogout } from '../hooks/useLogout';
import { useMe } from '../context/user';
import Link from 'next/link';

const useStyles = createStyles(theme => ({
    header: {
        paddingTop: theme.spacing.sm,
        backgroundColor: theme.colors.dark[6],
        borderBottom: `1px solid ${theme.colors.red[6]}`,
    },

    mainSection: {
        paddingBottom: theme.spacing.sm,
    },

    userMenu: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    user: {
        color: theme.white,
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor:
                theme.colors.red[theme.colorScheme === 'dark' ? 7 : 5],
        },
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    userActive: {
        backgroundColor: theme.colors.red[theme.colorScheme === 'dark' ? 7 : 5],
    },
}));

function Header() {
    const { user } = useMe();
    const { classes, theme, cx } = useStyles();
    const [opened, toggleOpened] = useBooleanToggle(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const { logout } = useLogout();

    return (
        <div className={classes.header}>
            <Container className={classes.mainSection} fluid>
                <Group position='apart'>
                    <Image src='/logo.png' alt='logo' width={100} height={40} />

                    <Burger
                        opened={opened}
                        onClick={() => toggleOpened()}
                        className={classes.burger}
                        size='sm'
                        color={theme.white}
                    />

                    {!user && (
                        <Group>
                            <Link href='/auth/login' passHref>
                                <Button size='sm' component='a'>
                                    Login
                                </Button>
                            </Link>

                            <Link href='/auth/register' passHref>
                                <Button size='sm' component='a'>
                                    Register
                                </Button>
                            </Link>
                        </Group>
                    )}

                    {user && (
                        <Menu
                            size={260}
                            placement='end'
                            transition='pop-top-right'
                            className={classes.userMenu}
                            onClose={() => setUserMenuOpened(false)}
                            onOpen={() => setUserMenuOpened(true)}
                            control={
                                <UnstyledButton
                                    className={cx(classes.user, {
                                        [classes.userActive]: userMenuOpened,
                                    })}
                                >
                                    <Group spacing={7}>
                                        <Avatar
                                            src='https://avatars.dicebear.com/api/big-smile/your-custom-seed.svg'
                                            alt={user.username}
                                            radius='xl'
                                            size='md'
                                        />
                                        <Text
                                            weight={500}
                                            size='sm'
                                            sx={{
                                                lineHeight: 1,
                                                color: theme.white,
                                            }}
                                            mr={3}
                                        >
                                            {user.username}
                                        </Text>
                                        <ChevronDown size={12} />
                                    </Group>
                                </UnstyledButton>
                            }
                        >
                            <Menu.Item
                                icon={
                                    <Heart
                                        size={14}
                                        color={theme.colors.red[6]}
                                    />
                                }
                                component={NextLink}
                                href='/favorites'
                            >
                                Liked Videos
                            </Menu.Item>
                            <Menu.Item
                                icon={
                                    <Upload
                                        size={14}
                                        color={theme.colors.yellow[6]}
                                    />
                                }
                            >
                                Your Uploads
                            </Menu.Item>
                            <Menu.Item
                                icon={
                                    <Message
                                        size={14}
                                        color={theme.colors.blue[6]}
                                    />
                                }
                            >
                                Your comments
                            </Menu.Item>

                            <Menu.Label>Settings</Menu.Label>
                            <Menu.Item
                                icon={<Settings size={14} />}
                                component={NextLink}
                                href='/settings'
                            >
                                Account settings
                            </Menu.Item>
                            <Menu.Item
                                icon={<SwitchHorizontal size={14} />}
                                component={NextLink}
                                href='/login'
                            >
                                Change account
                            </Menu.Item>
                            <Menu.Item
                                icon={<Logout size={14} />}
                                onClick={logout}
                            >
                                Logout
                            </Menu.Item>

                            <Divider />

                            <Menu.Label>Danger zone</Menu.Label>
                            <Menu.Item icon={<PlayerPause size={14} />}>
                                Pause subscription
                            </Menu.Item>
                            <Menu.Item color='red' icon={<Trash size={14} />}>
                                Delete account
                            </Menu.Item>
                        </Menu>
                    )}
                </Group>
            </Container>
        </div>
    );
}

export default Header;
