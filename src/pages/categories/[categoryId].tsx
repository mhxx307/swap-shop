import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { isUndefined, omitBy } from 'lodash';

import {
    Breadcrumb,
    ClientOnly,
    CommonSection,
    Head,
    Pagination,
} from '@/components/shared';
import {
    Article,
    ArticlesDocument,
    ArticlesQuery,
    QueryArticlesArgs,
    QueryConfig,
    useArticlesQuery,
} from '@/generated/graphql';
import { addApolloState, initializeApollo } from '@/libs/apolloClient';
import { useQueryConfig } from '@/hooks';
import { useRouter } from 'next/router';
import {
    getIdFromNameId,
    getNameFromNameId,
    removeSpecialCharacter,
} from '@/utils';
import { useEffect, useState } from 'react';
import { ArticleListByCategory } from '@/components/features/articles';

const Categories = () => {
    const { query } = useRouter();

    const [category, setCategory] = useState({
        id: '',
        name: '',
    });

    const queryConfig = useQueryConfig();

    const { data: articlesData } = useArticlesQuery({
        variables: {
            queryConfig: {
                ...queryConfig,
                categories: category.id ? [category.id] : undefined,
            },
        },
        skip: !category.id,
    });

    const articles = articlesData?.articles.data?.articles;
    const pageSize = articlesData?.articles.data?.pagination.page_size;

    useEffect(() => {
        if (query.categoryId) {
            const categoryId = getIdFromNameId(query.categoryId as string);
            const categoryName = getNameFromNameId(query.categoryId as string);
            setCategory({
                id: categoryId,
                name: categoryName,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!articles) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Head />
            <ClientOnly>
                <div className="flex w-full flex-col">
                    <CommonSection
                        title={`Khám phá ${removeSpecialCharacter(
                            category.name,
                        ).replace(/\s/g, ' ')}`}
                    />
                    <div className="container mt-8 space-y-6 pb-[20px]">
                        <Breadcrumb />
                        {pageSize && (
                            <ArticleListByCategory
                                articles={articles as Article[]}
                                pageSize={pageSize}
                                queryConfig={queryConfig}
                            />
                        )}

                        <Pagination
                            pageSize={
                                articlesData.articles.data?.pagination
                                    .page_size as number
                            }
                            queryConfig={queryConfig}
                        />
                    </div>
                </div>
            </ClientOnly>
        </>
    );
};

export default Categories;

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    const { query } = context;
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
        },
        isUndefined,
    );

    const Cookie = context.req.headers.cookie;

    const apolloClient = initializeApollo();

    await apolloClient.query<ArticlesQuery, QueryArticlesArgs>({
        context: { headers: { Cookie } },
        query: ArticlesDocument,
        variables: {
            queryConfig: queryConfig,
        },
        //Rerender component when networkStatus change
        notifyOnNetworkStatusChange: true,
    });

    return addApolloState(apolloClient, {
        props: {},
    });
};
