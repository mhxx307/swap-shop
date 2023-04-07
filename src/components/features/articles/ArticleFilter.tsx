import { Select } from '@/components/shared';
import { path } from '@/constants';
import { QueryConfig, useCategoriesQuery } from '@/generated/graphql';
import { useRouter } from 'next/router';

interface Props {
    queryConfig: QueryConfig;
}

function ArticleFilter({ queryConfig }: Props) {
    const { data: categoriesData } = useCategoriesQuery();
    const categories = categoriesData?.categories;

    const router = useRouter();

    const handleFilterCategories = (selectedCategories: any) => {
        const selectedCategoryIds = selectedCategories.map(
            (category: any) => category.value,
        );

        router.push({
            pathname: path.market,
            query: {
                ...queryConfig,
                categories: selectedCategoryIds,
            },
        });
    };

    return (
        <div className="">
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
            />
        </div>
    );
}

export default ArticleFilter;
