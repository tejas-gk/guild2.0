import React from 'react';
import MainLayout from './MainLayout';
import ChatLayout from './ChatLayout';
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
    }

    return <MainLayout>{children}</MainLayout>;
};

export default Layout;
