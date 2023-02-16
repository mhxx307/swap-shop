import { ImageUpload } from '@/components/features/uploads';
import { Auth, Button, InputField, FormSelect } from '@/components/shared';
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
    const { control, handleSubmit } = useForm<any>({
        defaultValues: {
            title: '',
            category: '',
            brand: '',
            price: '',
        },
    });

    const handleAddProduct = (payload: any) => {
        console.log(payload);
    };

    return (
        // <Auth>
        <section className="bg-white dark:bg-primaryDark pt-[100px]">
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
                                type="text"
                                label="Title"
                                name="title"
                                control={control}
                                containerInputClassName="default-input"
                                placeholder="Title"
                            />
                        </div>

                        <InputField
                            label="Product"
                            type="text"
                            name="product"
                            control={control}
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
                                name="price"
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
                            label="Item weight"
                            type="text"
                            name="weight"
                            control={control}
                            containerInputClassName="default-input"
                        />

                        <div className="sm:col-span-2 space-y-2">
                            <p>Thumbnail:</p>
                            <ImageUpload multiple={false} initialFiles={[]} />
                        </div>

                        <div className="sm:col-span-2 space-y-2">
                            <p>Images:</p>
                            <ImageUpload initialFiles={[]} />
                        </div>

                        <div className="sm:col-span-2 space-y-2">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                rows={8}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Your description here"
                            />
                        </div>
                    </div>
                    <Button primary>Add product</Button>
                </form>
            </div>
        </section>
        //</Auth>
    );
};

export default CreateArticle;
