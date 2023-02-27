import { ImageUpload } from '@/components/features/uploads';
import { Auth, Button, InputField, FormSelect } from '@/components/shared';
import { limitArticlesPaginated } from '@/constants';
import { useInsertArticleMutation } from '@/types/generated/graphql';
import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useForm } from 'react-hook-form';

export interface CreateArticleProps {}

const prices = [
    { id: 1, label: 'Free' },
    { id: 2, label: 'Charges' },
];

const CreateArticle = (props: CreateArticleProps) => {
    const [checked, setChecked] = useState(1);
    const { control, handleSubmit, register } = useForm<any>({
        defaultValues: {
            title: '',
            category: [''],
            brand: '',
            product: '',
            description: '',
            thumbnail: 'fuck',
        },
    });

    const [createArticle, { loading }] = useInsertArticleMutation();

    const handleAddProduct = async (payload: any) => {
        console.log(payload);
        await createArticle({
            variables: {
                insertArticleInput: {
                    title: payload.title,
                    description: payload.description,
                    productName: payload.product,
                    thumbnail: payload.thumbnail,
                },
            },
            update(cache, { data }) {
                cache.modify({
                    fields: {
                        articles(existingArticles) {
                            if (
                                data?.insertArticle.success &&
                                data.insertArticle.article
                            ) {
                                const newArticleRef = cache.identify(
                                    data.insertArticle.article,
                                );

                                const newTotalCount =
                                    existingArticles.totalCount + 1;

                                const newPaginatedArticles = [
                                    { __ref: newArticleRef },
                                    ...existingArticles.paginatedArticles,
                                ];

                                // Remove final article from paginatedArticles array using splice()
                                if (
                                    newPaginatedArticles.length >
                                    limitArticlesPaginated
                                ) {
                                    newPaginatedArticles.splice(-1, 1);
                                }

                                const newArticlesAfterCreation = {
                                    ...existingArticles,
                                    totalCount: newTotalCount,
                                    paginatedArticles: newPaginatedArticles,
                                };

                                return newArticlesAfterCreation;
                            }
                        },
                    },
                });
            },
        });
    };

    return (
        <Auth>
            <section className="bg-white dark:bg-primaryDark pt-[200px]">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
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
                                name="product"
                                containerInputClassName="default-input"
                                placeholder="Product name"
                            />

                            <div>
                                <div className="flex justify-between">
                                    <label htmlFor="" className="default-label">
                                        Price
                                    </label>
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
                                </div>
                                <CurrencyInput
                                    // name="price"
                                    {...register('price')}
                                    placeholder={
                                        checked === 1
                                            ? 'Free'
                                            : 'Please enter a number'
                                    }
                                    decimalsLimit={2}
                                    onValueChange={(value, name) =>
                                        console.log(value, name)
                                    }
                                    suffix="vnđ"
                                    disabled={checked === 1}
                                    className={`default-input outline-none w-full ${
                                        checked === 1 &&
                                        'opacity-70 cursor-not-allowed'
                                    }`}
                                />
                            </div>

                            <FormSelect
                                control={control}
                                defaultValue={''}
                                name="category"
                                selectProps={{
                                    placeholder: 'Category',
                                    options: [
                                        {
                                            value: 'Category 1',
                                            label: 'Category 1',
                                        },
                                        {
                                            value: 'Category 2',
                                            label: 'Category 2',
                                        },
                                    ],
                                    isMulti: true,
                                }}
                                label="Category"
                            />

                            <InputField
                                label="Brand"
                                type="text"
                                name="brand"
                                control={control}
                                containerInputClassName="default-input"
                            />

                            <div className="sm:col-span-2 space-y-2">
                                <p>Thumbnail:</p>
                                <ImageUpload
                                    multiple={false}
                                    initialFiles={[]}
                                />
                            </div>

                            <div className="sm:col-span-2 space-y-2">
                                <p>Images:</p>
                                <ImageUpload initialFiles={[]} />
                            </div>

                            <div className="sm:col-span-2 space-y-2">
                                <label htmlFor="description">Description</label>
                                <InputField
                                    type="text"
                                    name="description"
                                    control={control}
                                    containerInputClassName="default-input"
                                />
                                {/* <textarea
                                    id="description"
                                    rows={8}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Your description here"
                                /> */}
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
