import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useUsers = (userId?: string) => {
    const url = userId ? `/api/users/${userId}` : '/api/users';
    const { data, error, isLoading, mutate } = useSWR(url, fetcher);
    return {
        data,
        error,
        isLoading,
        mutate,
    };
};

export default useUsers;
