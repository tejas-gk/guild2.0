import ToFollow from '@/components/ToFollow';
interface LayoutProps {
    children: React.ReactNode;
}
export default function MainLayout({ children }: LayoutProps) {
    return (
        <>
            <div
                className='
                    container
                    h-full max-w-6x
                    mx-auto
                    px-4
                    
                '
            >
                <div
                    className='
                        grid grid-cols-4
                        h-full
                        '
                >
                    <div
                        className='
                            col-span-3 lg:col-span-3
                            border-x-[1px] border-gray-800
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
