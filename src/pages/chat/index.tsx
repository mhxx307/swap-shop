import { ChatLayout } from '@/components/layouts';
import { ReactNode } from 'react';

function Chat() {
    return <div>No conversation</div>;
}

export default Chat;

// eslint-disable-next-line react/display-name
Chat.Layout = (page: ReactNode) => <ChatLayout>{page}</ChatLayout>;
