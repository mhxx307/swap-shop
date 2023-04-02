import { useGetConversationQuery, useMessagesQuery } from '@/generated/graphql';
import { useRouter } from 'next/router';
import React from 'react';

function ChatBox() {
    const {
        query: { userId },
    } = useRouter();

    const { data: conversationData } = useGetConversationQuery({
        variables: {
            userId: userId as string,
        },
        skip: !userId,
    });

    const { data: messagesData } = useMessagesQuery({
        variables: {
            conversationId: conversationData?.getConversation?.id as string,
        },
        skip: !conversationData?.getConversation?.id,
    });

    const conversation = conversationData?.getConversation;
    const messages = messagesData?.messages;

    console.log(messages);

    return (
        <div className="container header-height">
            {conversation && messages ? (
                messages.map((message) => (
                    <div key={message.id}>{message.text}</div>
                ))
            ) : (
                <div>Conversation not found</div>
            )}
        </div>
    );
}

export default ChatBox;
