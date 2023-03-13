import { useState } from 'react';
import { Control, Controller, FieldValues, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import ReactQuill from 'react-quill';
// import ReactCurrentcyInput from "react-currency-input-field"
import 'react-quill/dist/quill.snow.css';

import { ImageUpload } from '@/components/features/uploads';
import { Auth, Button, InputField, FormSelect } from '@/components/shared';
import {
    InsertArticleInput,
    useCategoriesQuery,
    useInsertArticleMutation,
} from '@/generated/graphql';

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
    const router = useRouter();
    // const [file, setFile] = useState<File | null>(null);
    const [checked, setChecked] = useState(1);
    const { control, handleSubmit } = useForm<InsertArticleInput>({
        defaultValues: {
            title: '',
            description: '',
            productName: '',
            images: [
                'https://images.unsplash.com/photo-1574539602047-548bf9557352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2V4eSUyMGdpcmx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
            ],
            categoryIds: [''],
            price: 0,
        },
    });

    const [createArticle, { loading }] = useInsertArticleMutation();
    const { data: categoriesData } = useCategoriesQuery();
    const categories = categoriesData?.categories;

    const handleAddProduct = async (payload: InsertArticleInput) => {
        await createArticle({
            variables: {
                insertArticleInput: {
                    title: payload.title,
                    description: payload.description,
                    productName: payload.productName,
                    images: payload.images,
                    categoryIds: payload.categoryIds,
                    price: payload.price,
                },
            },
        });

        router.push('/articles');
    };

    return (
        <Auth>
            <section className="bg-white pt-[200px] dark:bg-primaryDark">
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
                                <ImageUpload initialFiles={[]} />
                            </div>

                            <div className="space-y-2 sm:col-span-2">
                                <label htmlFor="description">Description</label>

                                <Controller
                                    control={control}
                                    name="description"
                                    render={({
                                        field: { onChange, onBlur, value, ref },
                                    }) => (
                                        <ReactQuill
                                            theme="snow"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            ref={ref}
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
