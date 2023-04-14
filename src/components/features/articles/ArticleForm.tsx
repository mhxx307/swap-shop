import { deleteObject, ref } from 'firebase/storage';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useMemo, useState } from 'react';
import { Control, Controller, FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { ImageUpload } from '@/components/features/uploads';
import { storage } from '@/libs/firebase';
import { Auth, Button, FormSelect, InputField } from '@/components/shared';
import { path, STATUS_ARTICLE } from '@/constants';
import {
    InsertArticleInput,
    User,
    useArticleQuery,
    useCategoriesQuery,
    useInsertArticleMutation,
    useMeQuery,
    useUpdateArticleMutation,
} from '@/generated/graphql';
import {
    createAttachmentUrl,
    createFileFromUrl,
    createUrlListFromFileList,
} from '@/utils';

import 'react-quill/dist/quill.snow.css';
import ArticleCardPreview from './ArticleCardPreview';
import { formats, modules } from '@/utils/Quill';
// import { useAuthContext } from '@/contexts/AuthContext';

const prices = [
    { id: 1, label: 'Free' },
    { id: 2, label: 'Charges' },
];

function ArticleForm({ id }: { id?: string }) {
    const ReactQuill = useMemo(
        () => dynamic(() => import('react-quill'), { ssr: false }),
        [],
    );
    const router = useRouter();
    const [files, setFiles] = useState<File[]>([]);
    const [checked, setChecked] = useState(1);

    // const { profile } = useAuthContext();
    const { data: meData } = useMeQuery();
    const profile = meData?.me;
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
            price: article?.price ? article.price : '0',
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmitArticle = async (
        payload: Omit<InsertArticleInput, 'images'>,
    ) => {
        const urlArticles = await createUrlListFromFileList(files, 'articles');

        if (!article) {
            if (urlArticles.length > 0) {
                await createArticle({
                    variables: {
                        insertArticleInput: {
                            title: payload.title,
                            description: payload.description,
                            productName: payload.productName,
                            images: urlArticles,
                            categoryIds: payload.categoryIds,
                            price: payload.price,
                        },
                    },
                    onCompleted: () => {
                        router.push(path.dashboardPublished);
                    },
                });
            } else {
                toast.error('Please upload an image article');
                return;
            }
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

            await updateArticle({
                variables: {
                    updateArticleInput: {
                        id: articleDataUpdate.article?.id as string,
                        title: payload.title,
                        description: payload.description,
                        productName: payload.productName,
                        images: urlArticles,
                        categoryIds: payload.categoryIds,
                        price: payload.price,
                        status: STATUS_ARTICLE.PENDING,
                    },
                },
                onCompleted: () => {
                    router.push(path.dashboardPublished);
                },
            });
        }
    };

    return (
        <Auth>
            <section className="container bg-white dark:bg-primaryDark">
                <div className="mt-12 grid grid-cols-12">
                    <div className="col-span-6 mr-6 md:col-span-4 lg:col-span-3">
                        <h5 className="text-light mb-4">Preview Item</h5>
                        <ArticleCardPreview
                            control={control}
                            thumbnail={
                                files[0]
                                    ? URL.createObjectURL(files[0])
                                    : '/images/avatar-fallback.png'
                            }
                            user={profile as User}
                        />
                    </div>
                    <div className="col-span-6 md:col-span-8 lg:col-span-9">
                        <div>
                            <form
                                action="#"
                                onSubmit={handleSubmit(handleSubmitArticle)}
                                className="space-y-4"
                            >
                                <div className="space-y-6">
                                    <div className="mb-[15px]">
                                        <InputField
                                            control={control}
                                            type="text"
                                            label="Title:"
                                            name="title"
                                            placeholder="Title"
                                        />
                                    </div>

                                    <div className="">
                                        <InputField
                                            control={control}
                                            type="text"
                                            label="Product:"
                                            name="productName"
                                            placeholder="Product name"
                                        />
                                    </div>

                                    <div>
                                        <span className="text-sm">Price:</span>
                                        <PriceOptions
                                            checked={checked}
                                            setChecked={setChecked}
                                        />
                                        <InputField
                                            control={control}
                                            type="number"
                                            name="price"
                                            placeholder="Price"
                                            disabled={checked === 1}
                                        />
                                    </div>

                                    <div>
                                        <FormSelect
                                            control={
                                                control as unknown as Control<FieldValues>
                                            }
                                            defaultValue={''}
                                            name="categoryIds"
                                            selectProps={{
                                                placeholder: 'Category',
                                                options: categories
                                                    ? categories.map(
                                                          (category) => ({
                                                              value: category.id,
                                                              label: category.name,
                                                          }),
                                                      )
                                                    : [],
                                                isMulti: true,
                                            }}
                                            label="Category"
                                        />
                                    </div>

                                    <div className="">
                                        <p>Images:</p>
                                        <ImageUpload
                                            initialFiles={files}
                                            onChange={setFiles}
                                            multiple
                                            value={files.filter(
                                                (file, index, self) =>
                                                    index ===
                                                    self.findIndex(
                                                        (f) =>
                                                            f.name ===
                                                            file.name,
                                                    ),
                                            )}
                                        />
                                    </div>

                                    <div className="">
                                        <label htmlFor="description">
                                            Description
                                        </label>
                                        <Controller
                                            control={control}
                                            name="description"
                                            render={({
                                                field: {
                                                    onChange,
                                                    onBlur,
                                                    value,
                                                },
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

                                <Button
                                    primary
                                    isLoading={loading}
                                    type="submit"
                                >
                                    Add product
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Auth>
    );
}

export default ArticleForm;

const PriceOptions = ({
    checked,
    setChecked,
}: {
    checked: number;
    setChecked: React.Dispatch<SetStateAction<number>>;
}) => {
    return (
        <div className="mb-2 flex items-center space-x-2">
            <span className="text-sm">Options: </span>
            {prices.map((item) => {
                return (
                    <div key={item.id} className="flex items-center text-sm">
                        <label htmlFor="">{item.label}</label>
                        <input
                            type="radio"
                            checked={checked === item.id}
                            onChange={() => setChecked(item.id)}
                        />
                    </div>
                );
            })}
        </div>
    );
};
