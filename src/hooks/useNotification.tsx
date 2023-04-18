import { useEffect, useState } from 'react';
import {
    useMeQuery,
    useNewNotificationPrivateSubscription,
    useNewNotificationSubscription,
    useNotificationsQuery,
} from '@/generated/graphql';

function useNotification() {
    const [isNew, setIsNew] = useState<boolean>(false);
    const { data: me } = useMeQuery();
    const profile = me?.me;
    const { data: notificationData } = useNewNotificationSubscription({
        fetchPolicy: 'no-cache',
        onComplete: () => {
            console.log('onComplete');
        },
        onError: (error) => {
            console.log(error);
        },
    });
    const { data: notificationPrivateData } =
        useNewNotificationPrivateSubscription({
            variables: {
                userId: profile?.id as string,
            },
            skip: !profile,
            fetchPolicy: 'no-cache',
            onComplete: () => {
                console.log('onComplete');
            },
            onError: (error) => {
                console.log(error);
            },
        });
    const { data: notificationDataList } = useNotificationsQuery({
        fetchPolicy: 'no-cache',
    });

    const notificationList = notificationDataList?.notifications;

    useEffect(() => {
        if (
            notificationData?.newNotification.notification ||
            notificationPrivateData?.newNotificationPrivate.notification
        ) {
            setIsNew(true);
        }
    }, [notificationData, notificationPrivateData]);

    return {
        isNew,
        setIsNew,
        notificationList,
    };
}

export default useNotification;
