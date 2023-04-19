import {
    useDeletedMessageSubscription,
    useGetConversationQuery,
    useMeQuery,
    useMessageIncomingSubscription,
    useMessagesQuery,
    useUpdatedMessageSubscription,
} from '@/generated/graphql';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function useMessage() {
    const {
        query: { userId },
    } = useRouter();

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
        fetchPolicy: 'no-cache',
    });

    const { data: messageIncomingData } = useMessageIncomingSubscription();
    const { data: messageUpdatedData } = useUpdatedMessageSubscription();
    const { data: messageDeletedData } = useDeletedMessageSubscription();

    useEffect(() => {
        if (
            messageIncomingData?.messageIncoming ||
            messageUpdatedData?.updatedMessage ||
            messageDeletedData?.deletedMessage.message
        ) {
            refetch();
        }
    }, [messageIncomingData, messageUpdatedData, messageDeletedData, refetch]);

    return {
        messagesData,
        conversationData,
    };
}

export default useMessage;
