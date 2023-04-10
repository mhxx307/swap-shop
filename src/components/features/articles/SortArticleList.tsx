import { QueryConfig } from '@/generated/graphql';
import classNames from 'classnames';
import { omit } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

import { path, SORT_BY, ORDER } from 'src/constants';

interface PaginationProps {
    queryConfig: QueryConfig;
    pageSize: number;
}

const SortArticleList = ({ queryConfig, pageSize }: PaginationProps) => {
    const page = Number(queryConfig.page);
    const router = useRouter();
    const { sort_by = SORT_BY.createDate, order_by } = queryConfig;

    const isActiveSortBy = (
        sortByValue: Exclude<QueryConfig['sort_by'], undefined>,
    ) => {
        return sort_by === sortByValue;
    };

    const handleSort = (
        sortByValue: Exclude<QueryConfig['sort_by'], undefined>,
    ) => {
        router.push({
            pathname: path.market,
            query: omit(
                {
                    ...queryConfig,
                    sort_by: sortByValue,
                },
                ['order_by'],
            ),
        });
    };

    const handlePriceOrder = (
        orderValue: Exclude<QueryConfig['order_by'], undefined>,
    ) => {
        router.push({
            pathname: path.market,
            query: {
                ...queryConfig,
                sort_by: SORT_BY.price,
                order_by: orderValue,
            },
        });
    };

    return (
        <div className="bg-white py-4 px-3 dark:bg-[#343444]">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                    <div>Sắp xếp theo</div>
                    <button
                        className={classNames(
                            'h-8 px-4 text-center text-sm capitalize ',
                            {
                                'hover:bg-primary/80 bg-secondary text-white':
                                    isActiveSortBy(SORT_BY.views),
                            },
                            {
                                'bg-white text-black hover:bg-slate-100':
                                    !isActiveSortBy(SORT_BY.views),
                            },
                        )}
                        onClick={() => handleSort(SORT_BY.views)}
                    >
                        Phổ biến
                    </button>
                    <button
                        className={classNames(
                            'h-8 px-4 text-center text-sm capitalize ',
                            {
                                'bg-secondary text-white hover:bg-secondary/80':
                                    isActiveSortBy(SORT_BY.createDate),
                            },
                            {
                                'bg-white text-black hover:bg-slate-100':
                                    !isActiveSortBy(SORT_BY.createDate),
                            },
                        )}
                        onClick={() => handleSort(SORT_BY.createDate)}
                    >
                        Mới nhất
                    </button>
                    <button
                        className={classNames(
                            'h-8 px-4 text-center text-sm capitalize ',
                            {
                                'bg-secondary text-white hover:bg-secondary/80':
                                    isActiveSortBy(SORT_BY.favorites),
                            },
                            {
                                'bg-white text-black hover:bg-slate-100':
                                    !isActiveSortBy(SORT_BY.favorites),
                            },
                        )}
                        onClick={() => handleSort(SORT_BY.favorites)}
                    >
                        Yêu thích
                    </button>
                    <select
                        className={classNames(
                            'h-8 px-4 text-left text-sm capitalize text-black outline-none ',
                            {
                                'bg-secondary text-white hover:bg-secondary/80':
                                    isActiveSortBy(SORT_BY.price),
                            },
                            {
                                'bg-white text-black hover:bg-slate-100':
                                    !isActiveSortBy(SORT_BY.price),
                            },
                        )}
                        value={order_by || ''}
                        onChange={(e) =>
                            handlePriceOrder(
                                e.target.value as Exclude<
                                    QueryConfig['order_by'],
                                    undefined
                                >,
                            )
                        }
                    >
                        <option
                            value=""
                            disabled
                            className="bg-white text-black"
                        >
                            Giá
                        </option>
                        <option
                            value={ORDER.asc}
                            className="bg-white text-black"
                        >
                            Giá: Thấp đến cao
                        </option>
                        <option
                            value={ORDER.desc}
                            className="bg-white text-black"
                        >
                            Giá: Cao đến thấp
                        </option>
                    </select>
                </div>

                <div className="flex items-center">
                    <div>
                        <span className="text-secondabg-secondary">{page}</span>
                        <span>/{pageSize}</span>
                    </div>
                    <div className="flex-center ml-2">
                        {page === 1 ? (
                            <span className="flex-center h-8 cursor-not-allowed rounded-tl-sm rounded-bl-sm bg-white/60 px-3 shadow hover:bg-slate-100">
                                <FaChevronLeft className="text-gray-300" />
                            </span>
                        ) : (
                            <Link
                                href={{
                                    pathname: path.market,
                                    query: {
                                        ...queryConfig,
                                        page: (page - 1).toString(),
                                    },
                                }}
                                className="flex-center h-8 cursor-pointer rounded-tl-sm rounded-bl-sm bg-white/60 px-3 shadow hover:bg-slate-100"
                            >
                                <FaChevronLeft />
                            </Link>
                        )}

                        {page === pageSize ? (
                            <span className="flex-center h-8 cursor-not-allowed rounded-tl-sm rounded-bl-sm bg-white/60 px-3 shadow hover:bg-slate-100">
                                <FaChevronRight className="text-gray-300" />
                            </span>
                        ) : (
                            <Link
                                href={{
                                    pathname: path.market,
                                    query: {
                                        ...queryConfig,
                                        page: (page + 1).toString(),
                                    },
                                }}
                                className="flex-center h-8 cursor-pointer rounded-tl-sm rounded-bl-sm bg-white/60 px-3 shadow hover:bg-slate-100"
                            >
                                <FaChevronRight />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortArticleList;
