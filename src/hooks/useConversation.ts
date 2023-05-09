import { useRouter } from 'next/router';
import { useMemo } from 'react';

const useConversation = () => {
    const params = useRouter().query;

    const conversationId = useMemo(() => {
        if (!params?.conversationId) {
            return '';
        }

        return params.conversationId as string;
    }, [params?.conversationId]);

    const isOpen = useMemo(() => !!conversationId, [conversationId]);

    return useMemo(
        () => ({
            isOpen,
            conversationId,
        }),
        [isOpen, conversationId]
    );
};

export default useConversation;
