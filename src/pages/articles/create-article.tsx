import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { Control, Controller, FieldValues, useForm } from 'react-hook-form';
// import ReactCurrentcyInput from "react-currency-input-field"
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

import { ImageUpload } from '@/components/features/uploads';
import { Auth, Button, FormSelect, InputField } from '@/components/shared';
import {
    InsertArticleInput,
    useCategoriesQuery,
    useInsertArticleMutation,
} from '@/generated/graphql';
import { storage } from '@/libs/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { path } from '@/constants';
import { toast } from 'react-toastify';

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

const CreateArticle = () => {
    const ReactQuill = useMemo(
        () => dynamic(() => import('react-quill'), { ssr: false }),
        [],
    );
    const router = useRouter();
    const [files, setFiles] = useState<File[]>([]);

    const [checked, setChecked] = useState(1);
    const { control, handleSubmit } = useForm<
        Omit<InsertArticleInput, 'images'>
    >({
        defaultValues: {
            title: '',
            description: '',
            productName: '',
            categoryIds: [''],
            price: 0,
        },
    });

    const [createArticle, { loading }] = useInsertArticleMutation();
    const { data: categoriesData } = useCategoriesQuery();
    const categories = categoriesData?.categories;

    const handleAddProduct = async (
        payload: Omit<InsertArticleInput, 'images'>,
    ) => {
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
                        onSubmit={handleSubmit(handleAddProduct)}
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
                                    initialFiles={[]}
                                    onChange={setFiles}
                                    multiple
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
};

export default CreateArticle;
