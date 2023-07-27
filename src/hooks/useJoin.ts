import axios from 'axios';
import { useCallback, useMemo } from 'react';
import useCurrentUser from './useCurrentUser';
import { useLoginModal } from './useModal';
import useUsers from './useUsers';
import { useToast } from './useToast';

const useFollow = (userId: string) => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUsers(userId);

    const loginModal = useLoginModal();
    const toast = useToast();

    const isJoined = useMemo(() => {
        const list = currentUser?.joinedIds || [];

        return list.includes(userId);
    }, [currentUser, userId]);

    const toggleJoin = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (isJoined) {
                request = () => axios.delete('/api/join', { data: { userId } });
            } else {
                request = () => axios.post('/api/join', { userId });
            }

            await request();
            mutateCurrentUser();
            mutateFetchedUser();

            toast.success('Joined successfully');
        } catch (error) {
            toast.error('Something went wrong');
        }
    }, [
        currentUser,
        isJoined,
        userId,
        mutateCurrentUser,
        mutateFetchedUser,
        loginModal,
        toast,
    ]);

    return {
        isJoined,
        toggleJoin,
    };
};

export default useFollow;
