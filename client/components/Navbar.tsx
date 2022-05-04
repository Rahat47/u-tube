import React, { useState } from 'react';
import { createStyles, Navbar } from '@mantine/core';
import {
    BellRinging,
    SwitchHorizontal,
    Logout,
    MapSearch,
    CameraSelfie,
    Home,
    Stack3,
    History,
    Scissors,
    Clock,
} from 'tabler-icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('icon');
    return {
        navbar: {
            backgroundColor: theme.colors.dark[7],
        },

        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: theme.spacing.md * 1.5,
            borderBottom: `1px solid ${theme.colors.dark[9]}`,
        },

        footer: {
            paddingTop: theme.spacing.md,
            marginTop: theme.spacing.md,
            borderTop: `1px solid ${theme.colors.dark[9]}`,
        },

        link: {
            ...theme.fn.focusStyles(),
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: theme.fontSizes.sm,
            color: theme.white,
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            '&:hover': {
                backgroundColor: theme.colors.dark[4],
            },
        },

        linkIcon: {
            ref: icon,
            color: theme.white,
            opacity: 0.75,
            marginRight: theme.spacing.sm,
        },

        linkActive: {
            '&, &:hover': {
                backgroundColor: theme.colors.dark[8],
                [`& .${icon}`]: {
                    opacity: 0.9,
                },
            },
        },
    };
});

const data = [
    { link: '/', label: 'Home', icon: Home },
    { link: '/explore', label: 'Explore', icon: MapSearch },
    { link: '/shorts', label: 'Shorts', icon: CameraSelfie },
];

const userData = [
    { link: '/notifications', label: 'Notifications', icon: BellRinging },
    { link: '/library', label: 'Library', icon: Stack3 },
    { link: '/history', label: 'History', icon: History },
    { link: '/clips', label: 'Clips', icon: Scissors },
    { link: '/later', label: 'Watch Later', icon: Clock },
];

export function NavbarComp() {
    const router = useRouter();
    const { classes, cx } = useStyles();

    const links = data.map(item => (
        <Link key={item.label} href={item.link}>
            <a
                className={cx(classes.link, {
                    [classes.linkActive]: item.link === router.pathname,
                })}
                href={item.link}
                key={item.label}
            >
                <item.icon className={classes.linkIcon} />
                <span>{item.label}</span>
            </a>
        </Link>
    ));

    const userLinks = userData.map(item => (
        <Link key={item.label} href={item.link}>
            <a
                className={cx(classes.link, {
                    [classes.linkActive]: item.link === router.pathname,
                })}
                href={item.link}
                key={item.label}
            >
                <item.icon className={classes.linkIcon} />
                <span>{item.label}</span>
            </a>
        </Link>
    ));

    return (
        <Navbar width={{ sm: 300 }} p='md' className={classes.navbar}>
            <Navbar.Section className={classes.header}>{links}</Navbar.Section>
            <Navbar.Section grow>{userLinks}</Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <Link href='/auth/login'>
                    <a className={classes.link}>
                        <SwitchHorizontal className={classes.linkIcon} />
                        <span>Change account</span>
                    </a>
                </Link>

                <Link href='/'>
                    <a className={classes.link}>
                        <Logout className={classes.linkIcon} />
                        <span>Logout</span>
                    </a>
                </Link>
            </Navbar.Section>
        </Navbar>
    );
}
