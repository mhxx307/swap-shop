import { path } from '@/constants';
import { Schema } from '@/constants/schema';
import { useQueryConfig } from '@/hooks';
import { omit } from 'lodash';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

type FormData = Pick<Schema, 'title'>;

function useSearchArticles() {
    const queryConfig = useQueryConfig();
    const router = useRouter();
    const { register, watch, handleSubmit, setValue } = useForm<FormData>({
        defaultValues: {
            title: '',
        },
    });
    const watchTitle = watch('title');
    const handleSearch = handleSubmit((data: FormData) => {
        const config = queryConfig.order_by
            ? omit(
                  {
                      ...queryConfig,
                      title: data.title,
                  },
                  ['order_by', 'sort_by'],
              )
            : {
                  ...queryConfig,
                  title: data.title,
              };

        router.push({
            pathname: path.search,
            query: config,
        });
        setValue('title', '');
    });

    return {
        register,
        watchTitle,
        handleSearch,
    };
}

export default useSearchArticles;
