import omitBy from 'lodash/omitBy';
import isUndefined from 'lodash/isUndefined';
import { QueryConfig } from '@/generated/graphql';
import { useRouter } from 'next/router';

function useQueryConfig() {
    const { query } = useRouter();
    const queryConfig: QueryConfig = omitBy(
        {
            page: query.page || '1',
            limit: query.limit || '20',
            sort_by: query.sort_by,
            order_by: query.order_by,
            title: query.title,
            price_max: query.price_max,
            price_min: query.price_min,
            categories: query.categories,
            userId: query.userId,
            user_rating: query.user_rating,
        },
        isUndefined,
    );

    return queryConfig;
}

export default useQueryConfig;
