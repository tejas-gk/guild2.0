import React from 'react';
import MainLayout from './MainLayout';
import ChatLayout from './ChatLayout';
interface LayoutProps {
    children: React.ReactNode;
    pathname: string;
}

const Layout = ({ children, pathname }: LayoutProps) => {
    const chatReg = /^\/chat\//; // this means that the path starts with /chat/ and then anything else
    if (pathname === '/404') {
        return <div>{children}</div>;
    } else if (pathname.match(chatReg)) {
        return (
            <>
                <ChatLayout>{children}</ChatLayout>
            </>
        );
    } else if (pathname === '/settings') {
        return <MainLayout>{children}</MainLayout>;
    }

    return <MainLayout>{children}</MainLayout>;
};

export default Layout;
