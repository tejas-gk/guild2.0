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

    const isFollowing = useMemo(() => {
        const list = currentUser?.followingIds || [];

        return list.includes(userId);
    }, [currentUser, userId]);

    const toggleFollow = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (isFollowing) {
                request = () =>
                    axios.delete('/api/follow', { data: { userId } });
            } else {
                request = () => axios.post('/api/follow', { userId });
            }

            await request();
            mutateCurrentUser();
            mutateFetchedUser();

            toast.success('Followed successfully');
        } catch (error) {
            toast.error('Something went wrong');
        }
    }, [
        currentUser,
        isFollowing,
        userId,
        mutateCurrentUser,
        mutateFetchedUser,
        loginModal,
        toast,
    ]);

    return {
        isFollowing,
        toggleFollow,
    };
};

export default useFollow;
