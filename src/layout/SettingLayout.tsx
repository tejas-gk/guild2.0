import React from 'react';
interface Props {
    children: React.ReactNode;
}
import SettingsSidebar from '@/components/Sidebar/SettingsSidebar';

export default function SettingLayout({ children }: Props) {
    return (
        <>
            <div
                className='
                flex
            '
            >
                <SettingsSidebar />
                <div className='h-full'>{children}</div>
            </div>
        </>
    );
}
