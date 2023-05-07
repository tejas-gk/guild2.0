import React from 'react';
import MainLayout from './MainLayout';

interface LayoutProps {
    children: React.ReactNode;
    pathname: string;
}

const Layout = ({ children, pathname }: LayoutProps) => {
    if (pathname === '/404') {
        return <div>{children}</div>;
    }

    return <MainLayout>{children}</MainLayout>;
};

export default Layout;
