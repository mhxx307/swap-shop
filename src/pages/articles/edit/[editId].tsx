import ArticleForm from '@/components/features/articles/ArticleForm';
import { CommonSection } from '@/components/shared';
import { useRouter } from 'next/router';
import React from 'react';

function EditArticle() {
    const {
        query: { editId },
    } = useRouter();
    return (
        <div className="flex w-full flex-col">
            <CommonSection title="Update Form" />
            <ArticleForm id={editId as string} />
        </div>
    );
}

export default EditArticle;
