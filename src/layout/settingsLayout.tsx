import React from 'react';
import MainLayout from './MainLayout';
import ChatLayout from './ChatLayout';
import SidebarLayout from './sidebarLayout';
interface LayoutProps {
    children: React.ReactNode;
    pathname: string;
}

const Layout = ({ children, pathname }: LayoutProps) => {
    if (pathname === '/404') {
        return <div>{children}</div>;
    } else if (pathname === '/chats') {
        return (
            <>
                <ChatLayout>{children}</ChatLayout>
            </>
        );
    } else if (pathname === '/settings') {
        return (
            <>
                <SidebarLayout>{children}</SidebarLayout>
            </>
        );
    }

    return <MainLayout>{children}</MainLayout>;
};

export default Layout;
