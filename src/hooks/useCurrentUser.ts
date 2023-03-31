import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);
    console.log('data:', data);
    console.log('error:', error);
    console.log('isLoading:', isLoading);
    return {
        data,
        error,
        isLoading,
        mutate,
    };
};

export default useCurrentUser;
