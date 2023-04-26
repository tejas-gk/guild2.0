import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const usePosts = (userId?: string) => {
    const url = userId ? `/api/posts/${userId}` : '/api/posts';
    const { data, error, isLoading, mutate } = useSWR(url, fetcher);
    return {
        data,
        error,
        isLoading,
        mutate,
    };
};

export default usePosts;
