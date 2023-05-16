import { QueryConfig, useCategoriesQuery } from '@/generated/graphql';
import { useValidateSchema } from '@/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Button, InputField, Select } from '@/components/shared';
import { path } from '@/constants';
import RatingStars from './RatingStar';
import { useState } from 'react';

interface Props {
    queryConfig: QueryConfig;
}

interface FormState {
    price_min: string;
    price_max: string;
}

const AsideFilterMarket = ({ queryConfig }: Props) => {
    const router = useRouter();
    const schema = useValidateSchema('priceMinMax');
    const { data: categoriesData } = useCategoriesQuery();
    const categories = categoriesData?.categories;
    const { handleSubmit, control, reset } = useForm<FormState>({
        defaultValues: {
            price_min: '',
            price_max: '',
        },
        resolver: yupResolver(schema),
    });
    const [selectedCategories, setSelectedCategories] = useState<any>([]);

    const handleFilterCategories = (selectedCategories: any) => {
        const selectedCategoryIds = selectedCategories.map(
            (category: any) => category.value,
        );
        setSelectedCategories(selectedCategories);

        router.push(
            {
                pathname: path.market,
                query: {
                    ...queryConfig,
                    categories: selectedCategoryIds,
                },
            },
            // undefined,
            // { shallow: true },
        );
    };

    const handleFilterByPrice = (payload: FormState) => {
        router.push({
            pathname: path.market,
            query: {
                ...queryConfig,
                price_min: payload.price_min,
                price_max: payload.price_max,
            },
        });
    };

    const handleRemoveAll = () => {
        reset();
        setSelectedCategories([]);
        router.replace(path.market, undefined, { shallow: true });
    };

    return (
        <div className="py-4">
            <Link href={path.market} className="flex items-center font-bold">
                <svg viewBox="0 0 12 10" className="mr-3 h-4 w-3 fill-current">
                    <g fillRule="evenodd" stroke="none" strokeWidth={1}>
                        <g transform="translate(-373 -208)">
                            <g transform="translate(155 191)">
                                <g transform="translate(218 17)">
                                    <path d="m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                                    <path d="m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                                    <path d="m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
                Tất cả danh mục
            </Link>
            <div className="my-4 h-[1px] bg-gray-300" />

            <Select
                isMulti
                options={
                    categories
                        ? categories.map((category) => ({
                              value: category.id,
                              label: category.name,
                          }))
                        : []
                }
                onChange={handleFilterCategories}
                value={selectedCategories}
            />

            <Link
                href={path.market}
                className="mt-4 flex items-center font-bold uppercase"
            >
                <svg
                    enableBackground="new 0 0 15 15"
                    viewBox="0 0 15 15"
                    x={0}
                    y={0}
                    className="mr-3 h-4 w-3 fill-current stroke-current"
                >
                    <g>
                        <polyline
                            fill="none"
                            points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit={10}
                        />
                    </g>
                </svg>
                Bộ lọc tìm kiếm
            </Link>
            <div className="my-4 h-[1px] bg-gray-300" />

            <div className="my-5">
                <div>Khoản giá</div>
                <form
                    className="mt-2"
                    onSubmit={handleSubmit(handleFilterByPrice)}
                >
                    <div className="mb-2 flex items-start">
                        <InputField
                            type="text"
                            control={control}
                            className="grow"
                            name="price_min"
                            placeholder="₫ TỪ"
                            containerInputClassName="p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                            onlyNumber
                        />
                        <div className="mx-2 mt-2 shrink-0">-</div>
                        <InputField
                            type="text"
                            control={control}
                            className="grow"
                            name="price_max"
                            placeholder="₫ ĐẾN"
                            containerInputClassName="p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                            onlyNumber
                        />
                    </div>
                    <Button secondary type="submit">
                        Áp dụng
                    </Button>
                </form>
            </div>
            <div className="my-4 h-[1px] bg-gray-300" />

            <div className="text-sm">Đánh giá</div>
            {/* <RatingStars queryConfig={queryConfig} /> */}
            <div className="my-4 h-[1px] bg-gray-300" />

            <Button secondary onClick={handleRemoveAll}>
                Xóa tất cả
            </Button>
        </div>
    );
};

export default AsideFilterMarket;
