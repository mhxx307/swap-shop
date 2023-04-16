// import ReactCurrentcyInput from "react-currency-input-field"
import ArticleForm from '@/components/features/articles/ArticleForm';
import { CommonSection } from '@/components/shared';

const CreateArticle = () => {
    return (
        <div className="flex w-full flex-col">
            <CommonSection title="Create" />
            <ArticleForm />
        </div>
    );
};

export default CreateArticle;
