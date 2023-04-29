import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const DeletePost = () => {
    const { data, error, isLoading, mutate } = useSWR(
        '/api/posts/delete',
        fetcher
    );
    return {
        data,
        error,
        isLoading,
        mutate,
    };
};

export default DeletePost;
