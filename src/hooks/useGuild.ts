import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useGuild = (userId?: string) => {
    const url = userId ? `/api/guild/${userId}` : '/api/guild';
    const { data, error, isLoading, mutate } = useSWR(url, fetcher);
    return {
        data,
        error,
        isLoading,
        mutate,
    };
};

export default useGuild;
