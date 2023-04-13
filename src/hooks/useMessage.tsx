import { useGetConversationQuery, useMessagesQuery } from '@/generated/graphql';
import { Socket } from 'socket.io-client';

import { useRouter } from 'next/router';
import { useRef } from 'react';

function useMessage() {
    const {
        query: { userId },
    } = useRouter();
    const socket = useRef<Socket>();

    const { data: conversationData } = useGetConversationQuery({
        variables: {
            userId: (userId as string).split('-i,')[1],
            articleId: (userId as string).split('-i,')[0],
        },
        skip: !userId,
        fetchPolicy: 'no-cache',
    });

    const { data: messagesData, refetch } = useMessagesQuery({
        variables: {
            conversationId: conversationData?.getConversation?.id as string,
        },
        skip: !conversationData?.getConversation?.id,
    });

    return {
        socket,
        messagesData,
        refetch,
        conversationData,
    };
}

export default useMessage;
