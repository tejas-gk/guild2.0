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
                        grid grid-cols-4
                        h-screen
                        '
                >
                    <div
                        className='
                            col-span-3 lg:col-span-3
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
