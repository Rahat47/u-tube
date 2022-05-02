import { AppShell, Box, Header, Navbar } from '@mantine/core';
import Image from 'next/image';
import { ReactNode } from 'react';
import { NavbarComp } from '../components/Navbar';

const HomePageLayout = ({ children }: { children: ReactNode }) => {
    return (
        <AppShell
            padding='md'
            navbar={<NavbarComp />}
            header={
                <Header height={60} p='xs'>
                    <Box>
                        <Box>
                            <Image
                                src='/logo.png'
                                alt='logo'
                                width={100}
                                height={40}
                            />
                        </Box>
                    </Box>
                </Header>
            }
        >
            {children}
        </AppShell>
    );
};

export default HomePageLayout;
