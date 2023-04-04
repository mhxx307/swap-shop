import ArticleForm from '@/components/features/articles/ArticleForm';
import { useRouter } from 'next/router';
import React from 'react';

function EditArticle() {
    const {
        query: { editId },
    } = useRouter();
    return <ArticleForm id={editId as string} />;
}

export default EditArticle;
