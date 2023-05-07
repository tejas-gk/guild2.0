interface LayoutProps {
    children: React.ReactNode;
}
export default function MainLayout({ children }: LayoutProps) {
    return (
        <>
            <div
                className='
                h-screen   
            '
            >
                <div
                    className='
                    container
                    h-full max-w-6xl
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
                       
                        '
                        >
                            jello
                        </div>
                        <div
                            className='
                            col-span-3 lg:col-span-2
                            border-x-[1px] border-gray-800
                            '
                        >
                            {children}
                        </div>
                        <div className=''>jello</div>
                    </div>
                </div>
            </div>
        </>
    );
}
