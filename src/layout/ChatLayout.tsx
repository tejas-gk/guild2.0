interface Props {
    children: React.ReactNode;
}
import Sidebar from '@/components/Sidebar';
import useUsers from '@/hooks/useUsers';
import UserList from '@/components/User/UserList';
export default function Index({ children }: Props) {
    const users = useUsers();
    console.log(users);
    return (
        <>
            <div
                className='
                flex
            '
            >
                <Sidebar />
                <div className='h-full'>{children}</div>
            </div>
        </>
    );
}
