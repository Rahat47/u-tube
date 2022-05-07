import { ReactNode } from 'react';
import { AppShell } from '@mantine/core';
import Header from '../components/Header';
import { NavbarComp } from '../components/Navbar';
import { VideoContextProvider } from '../context/videos';

const HomePageLayout = ({ children }: { children: ReactNode }) => {
    return (
        <VideoContextProvider>
            <AppShell padding='md' navbar={<NavbarComp />} header={<Header />}>
                {children}
            </AppShell>
        </VideoContextProvider>
    );
};

export default HomePageLayout;
