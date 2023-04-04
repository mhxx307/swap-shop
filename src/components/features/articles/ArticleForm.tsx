import { ImageUpload } from '@/components/features/uploads';
import { Auth, Button, FormSelect, InputField } from '@/components/shared';
import { path, STATUS_ARTICLE } from '@/constants';
import {
    ArticleDocument,
    ArticleQuery,
    InsertArticleInput,
    QueryArticleArgs,
    useArticleQuery,
    useCategoriesQuery,
    useInsertArticleMutation,
    useUpdateArticleMutation,
} from '@/generated/graphql';
import { initializeApollo } from '@/libs/apolloClient';
import { storage } from '@/libs/firebase';
import { createAttachmentUrl, createFileFromUrl } from '@/utils';
import { async } from '@firebase/util';
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes,
} from 'firebase/storage';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { Control, Controller, FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import 'react-quill/dist/quill.snow.css';

const prices = [
    { id: 1, label: 'Free' },
    { id: 2, label: 'Charges' },
];

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image'],
        ['clean'],
    ],
};

const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
];

function ArticleForm({ id }: { id?: string }) {
    const ReactQuill = useMemo(
        () => dynamic(() => import('react-quill'), { ssr: false }),
        [],
    );
    const router = useRouter();
    const [files, setFiles] = useState<File[]>([]);
    const [checked, setChecked] = useState(1);

    const { data: articleDataUpdate } = useArticleQuery({
        variables: {
            articleId: id as string,
        },
        skip: !id,
    });
    const { data: categoriesData } = useCategoriesQuery();

    const categories = categoriesData?.categories;
    const article = articleDataUpdate?.article;
    const categoriesIdByArticle =
        article && article.categories.map((category) => category.id);

    const { control, handleSubmit } = useForm<
        Omit<InsertArticleInput, 'images'>
    >({
        defaultValues: {
            title: article?.title ? article.title : '',
            description: article?.description ? article.description : '',
            productName: article?.productName ? article.productName : '',
            categoryIds: categoriesIdByArticle ? categoriesIdByArticle : [''],
            price: article?.price ? article.price : 0,
        },
    });

    const [createArticle, { loading }] = useInsertArticleMutation();
    const [updateArticle] = useUpdateArticleMutation();

    useEffect(() => {
        article?.images.forEach((image) => {
            createFileFromUrl(image, image).then((file) => {
                setFiles((prev) => [...prev, file]);
            });
        });
    }, []);

    const handleSubmitArticle = async (
        payload: Omit<InsertArticleInput, 'images'>,
    ) => {
        if (!article) {
            const urlArticles: string[] = [];
            for (const file of files) {
                const fileRef = ref(storage, `articles/${file.name + v4()}`);
                const upload = await uploadBytes(fileRef, file);
                const url = await getDownloadURL(upload.ref);
                urlArticles.push(url);
            }

            if (urlArticles.length > 0) {
                await createArticle({
                    variables: {
                        insertArticleInput: {
                            title: payload.title,
                            description: payload.description,
                            productName: payload.productName,
                            images: urlArticles,
                            categoryIds: payload.categoryIds,
                            price: Number(payload.price),
                        },
                    },
                });
            } else {
                toast.error('Please upload an image article');
                return;
            }

            router.push(path.home);
        } else {
            const images = article.images;
            if (images.length > 0) {
                for (const image of images) {
                    const oldImageRef = ref(
                        storage,
                        createAttachmentUrl(image, 'articles'),
                    );
                    await deleteObject(oldImageRef);
                }
            }
            const urlArticles: string[] = [];
            for (const file of files) {
                const fileRef = ref(storage, `articles/${file.name + v4()}`);
                const upload = await uploadBytes(fileRef, file);
                const url = await getDownloadURL(upload.ref);
                urlArticles.push(url);
            }

            await updateArticle({
                variables: {
                    updateArticleInput: {
                        id: articleDataUpdate.article?.id as string,
                        title: payload.title,
                        description: payload.description,
                        productName: payload.productName,
                        images: urlArticles,
                        categoryIds: payload.categoryIds,
                        price: Number(payload.price),
                        status: STATUS_ARTICLE.PENDING,
                    },
                },
            });
        }
    };

    return (
        <Auth>
            <section className="container header-height bg-white dark:bg-primaryDark">
                <div className="mx-auto max-w-2xl py-8 px-4 lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                        Add a new product
                    </h2>
                    <form
                        action="#"
                        onSubmit={handleSubmit(handleSubmitArticle)}
                        className="space-y-4"
                    >
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <InputField
                                    control={control}
                                    type="text"
                                    label="Title"
                                    name="title"
                                    containerInputClassName="default-input"
                                    placeholder="Title"
                                />
                            </div>

                            <InputField
                                control={control}
                                type="text"
                                label="Product"
                                name="productName"
                                containerInputClassName="default-input"
                                placeholder="Product name"
                            />

                            {/* price or free, should split to component */}
                            <div>
                                <div className="flex space-x-2">
                                    {prices.map((item) => {
                                        return (
                                            <div key={item.id}>
                                                <label htmlFor="">
                                                    {item.label}
                                                </label>
                                                <input
                                                    type="radio"
                                                    checked={
                                                        checked === item.id
                                                    }
                                                    onChange={() =>
                                                        setChecked(item.id)
                                                    }
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                                <InputField
                                    control={control}
                                    type="number"
                                    label="Price"
                                    name="price"
                                    containerInputClassName="default-input"
                                    placeholder="Price"
                                    disabled={checked === 1}
                                />
                            </div>

                            <FormSelect
                                control={
                                    control as unknown as Control<FieldValues>
                                }
                                defaultValue={''}
                                name="categoryIds"
                                selectProps={{
                                    placeholder: 'Category',
                                    options: categories
                                        ? categories.map((category) => ({
                                              value: category.id,
                                              label: category.name,
                                          }))
                                        : [],
                                    isMulti: true,
                                }}
                                label="Category"
                            />

                            <div className="space-y-2 sm:col-span-2">
                                <p>Images:</p>
                                <ImageUpload
                                    initialFiles={files}
                                    onChange={setFiles}
                                    multiple
                                    value={files.filter(
                                        (file, index, self) =>
                                            index ===
                                            self.findIndex(
                                                (f) => f.name === file.name,
                                            ),
                                    )}
                                />
                            </div>

                            <div className="space-y-2 sm:col-span-2">
                                <label htmlFor="description">Description</label>
                                <Controller
                                    control={control}
                                    name="description"
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <ReactQuill
                                            theme="snow"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            modules={modules}
                                            formats={formats}
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <Button primary isLoading={loading} type="submit">
                            Add product
                        </Button>
                    </form>
                </div>
            </section>
        </Auth>
    );
}

export default ArticleForm;
