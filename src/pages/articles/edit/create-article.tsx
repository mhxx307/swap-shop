// import ReactCurrentcyInput from "react-currency-input-field"
import ArticleForm from '@/components/features/articles/ArticleForm';
import { CommonSection } from '@/components/shared';
import { path } from '@/constants';
import { useMeQuery } from '@/generated/graphql';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const CreateArticle = () => {
    const { data } = useMeQuery({ fetchPolicy: 'no-cache' });
    const profile = data?.me;
    const router = useRouter();

    console.log('test', profile);

    useEffect(() => {
        if (profile && Boolean(profile.phoneNumber) === false) {
            router.push(path.settingsProfile);
            toast.error(
                'Please update your phone number to create an article',
                {
                    toastId: 'enterPhone',
                },
            );
        }
    }, [profile, router]);

    return (
        <div className="flex w-full flex-col">
            <CommonSection title="Create" />
            <ArticleForm />
        </div>
    );
};

export default CreateArticle;
