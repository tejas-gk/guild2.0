interface Props {
    children: React.ReactNode;
}
import Sidebar from '@/components/Sidebar';
export default function index({ children }: Props) {
    return (
        <>
            <Sidebar>
                <div className='h-full'>{children}</div>
            </Sidebar>
        </>
        // {/* </Sidebar> */}
    );
}
