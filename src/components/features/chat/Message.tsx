import { Message } from '@/generated/graphql';
import classNames from 'classnames';
import TimeAgo from 'timeago-react';

interface MessageProps {
    own?: boolean;
    message: Message;
}

function Message({ own, message }: MessageProps) {
    return (
        <div
            className={classNames('mt-[20px] flex flex-col', {
                'mr-4 items-end': own,
            })}
        >
            {/* message top */}
            <div className="mr-[10px] flex">
                <img
                    className="mr-4 h-[32px] w-[32px] rounded-full object-cover"
                    src={
                        message.sender.avatar
                            ? message.sender.avatar
                            : '/images/avatar-fallback.png'
                    }
                    alt={message.text}
                />
                <p
                    className={classNames(
                        'max-w-[300px] rounded-md  p-[10px]',
                        {
                            'bg-[#1877f2] text-white': !own,
                            'bg-[#f5f1f1] text-black': own,
                        },
                    )}
                >
                    {message.text}
                </p>
            </div>
            {/* message bottom */}
            <div className="mt-[10px] text-xs">
                <TimeAgo datetime={message.createdDate} />
            </div>
        </div>
    );
}

export default Message;
