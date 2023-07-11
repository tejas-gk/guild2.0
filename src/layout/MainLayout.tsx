import ToFollow from '@/components/MainLeft';
interface LayoutProps {
    children: React.ReactNode;
}
export default function MainLayout({ children }: LayoutProps) {
    return (
        <>
            <div
                className='
                    container 
                    max-w-7xl
                    mx-auto
                    h-screen w-screen
                    pt-12
                    min-h-screen
                '
            >
                <div
                    className='
                        grid lg:grid-cols-4 grid-cols-1
                        h-screen
                        '
                >
                    <div
                        className='
                            col-span-1 lg:col-span-3
                            '
                    >
                        {children}
                    </div>
                    <ToFollow />
                </div>
            </div>
        </>
    );
}
