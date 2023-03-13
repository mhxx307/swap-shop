import { isUndefined, omitBy } from 'lodash';
import { QueryConfig } from '@/generated/graphql';
import { useRouter } from 'next/router';

function useQueryConfig() {
    const { query } = useRouter();
    const queryConfig: QueryConfig = omitBy(
        {
            limit: query.limit || '3',
            sort_by: query.sort_by,
            order_by: query.order_by,
            title: query.title,
            price_max: query.price_max,
            price_min: query.price_min,
            categories: query.categories,
            isFree: query.isFree,
        },
        isUndefined,
    );

    return queryConfig;
}

export default useQueryConfig;
