import { ArticleListByCategory } from '@/components/features/articles';
import {
    Button,
    ClientOnly,
    CommonSection,
    Head,
    Image,
    Popover,
    TabView,
} from '@/components/shared';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineMore } from 'react-icons/ai';
import ReactTextareaAutosize from 'react-textarea-autosize';

import {
    Article,
    QueryConfig,
    Review,
    User,
    useArticlesQuery,
    useDeleteReviewMutation,
    useMeQuery,
    useReviewUserMutation,
    useReviewsQuery,
    useUserByIdQuery,
} from '@/generated/graphql';
import { useQueryConfig } from '@/hooks';
import { getIdFromNameId } from '@/utils';
import classNames from 'classnames';
import { toast } from 'react-toastify';
// import { useAuthContext } from '@/contexts/AuthContext';

function StoreDetail() {
    const router = useRouter();
    const [id, setId] = useState('');

    const { data: userData } = useUserByIdQuery({
        variables: {
            userId: id,
        },
    });

    const user = userData?.getUserById;

    const queryConfig = useQueryConfig();

    const { data: articlesData } = useArticlesQuery({
        variables: {
            queryConfig: { ...queryConfig, userId: id },
        },
        skip: !userData,
    });
    const articles = articlesData?.articles.data?.articles;
    const pageSize = articlesData?.articles.data?.pagination.page_size;

    useEffect(() => {
        if (router.query.path) {
            setId(getIdFromNameId(router.query.path as string));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.query.path]);

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <>
            <Head />
            <ClientOnly>
                <div className="flex w-full flex-col">
                    <CommonSection title={`User: ${user.username}`} />
                    <div className="container my-12">
                        <div className="grid grid-cols-12">
                            <div className="col-span-4 rounded-sm">
                                {/* info store */}
                                <div className="bg-white p-6 dark:bg-[#343444]">
                                    <div className="relative pt-[calc(75%)]">
                                        {/* user avatar */}
                                        <Image
                                            src={
                                                user.avatar ||
                                                '/images/avatar-fallback.png'
                                            }
                                            alt="Avatar"
                                            className="h-full w-full rounded-[50%] object-cover text-center ss:mx-[24px]"
                                            classnamewrapper="flex-center text-sm z-50 w-24 h-24 absolute left-[20px] bottom-[-40px]"
                                        />

                                        {/* article image */}
                                        <Image
                                            src={
                                                '/images/login-background.avif'
                                            }
                                            alt="article"
                                            classnamewrapper="absolute top-0 w-full h-full"
                                        />
                                    </div>
                                    <div className="mt-12 rounded-sm">
                                        <div className="mb-2 flex">
                                            <p>Full name: </p>
                                            <h3 className="ml-4 font-bold text-[#919eab]">
                                                {user?.fullName}
                                            </h3>
                                        </div>
                                        <div className="mb-2 flex">
                                            <p>Username: </p>
                                            <h3 className="ml-4 font-bold text-[#919eab]">
                                                {user?.username}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* info detail */}
                            <div className="col-span-8 ml-4">
                                {/* about, article */}
                                <TabView
                                    tabs={[
                                        {
                                            label: 'About',
                                            content: (
                                                <About user={user as User} />
                                            ),
                                        },
                                        {
                                            label: 'Articles',
                                            content: (
                                                <ArticleListByCategory
                                                    articles={
                                                        articles as Article[]
                                                    }
                                                    pageSize={
                                                        pageSize as number
                                                    }
                                                    queryConfig={
                                                        queryConfig as QueryConfig
                                                    }
                                                />
                                            ),
                                        },
                                        {
                                            label: 'Rating',
                                            content: (
                                                <Rating
                                                    userId={user.id}
                                                    username={user.username}
                                                />
                                            ),
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </ClientOnly>
        </>
    );
}

export default StoreDetail;

const About = ({ user }: { user: User }) => {
    const { isOn } = useTheme();
    const queryConfig = useQueryConfig();
    const { data: articlesData } = useArticlesQuery({
        variables: {
            queryConfig: { ...queryConfig, userId: user?.id },
        },
        skip: !user,
        fetchPolicy: 'no-cache',
    });

    const articleCount = articlesData?.articles.data?.articles.length;
    return (
        <div className="col-span-8 bg-white p-2 dark:bg-[#343444]">
            <h3 className="text-2xl font-bold uppercase">
                <span
                    style={{
                        background:
                            'linear-gradient(-45deg, #e250e5, #4b50e6, #e250e5, #4b50e6)',
                        backgroundSize: '100% 100%',
                        backgroundClip: 'text',
                        marginBottom: 0,
                        WebkitTextStroke: '3px transparent',
                        WebkitTextFillColor: isOn ? '#14141f' : '#fff',
                        WebkitBackgroundClip: 'text',
                    }}
                >
                    {user.username}
                </span>{' '}
                infomation:
            </h3>

            <div className="grid grid-cols-8">
                <div className="col-span-4">
                    <div className="mt-4">
                        <p className="text-base font-bold">Full name: </p>
                        <p className="text-sm">{user.fullName}</p>
                    </div>

                    <div className="mt-4">
                        <p className="text-base font-bold">Address: </p>
                        <p className="text-sm">{user.address}</p>
                    </div>

                    <div className="mt-4">
                        <p className="text-base font-bold">Email: </p>
                        <p className="text-sm">{user.email}</p>
                    </div>

                    <div className="mt-4">
                        <p className="text-base font-bold">Phone number: </p>
                        <p className="text-sm">{user.phoneNumber}</p>
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="mt-4">
                        <p className="text-base font-bold">Article quantity:</p>
                        <p className="text-sm">{articleCount}</p>
                    </div>

                    <div className="mt-4">
                        <p className="text-base font-bold">Average rating: </p>
                        <p className="text-sm">{user.rating}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Rating = ({ userId, username }: { userId: string; username: string }) => {
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(0);

    const { data: reviewsData, refetch } = useReviewsQuery({
        variables: {
            reviewOptions: {
                limit: '10',
                page: '1',
                userId: userId,
            },
        },
    });

    const [reviewUserMutation, { loading }] = useReviewUserMutation();

    const reviews = reviewsData?.reviews.data?.reviews;

    const handleRatingChange = (score: number) => {
        setRating(score);
    };

    const handleReview = (e: any) => {
        e.preventDefault();
        reviewUserMutation({
            variables: {
                reviewUserInput: {
                    content,
                    rating: rating,
                    userId,
                },
            },
            onCompleted: (data) => {
                refetch();
                setContent('');
                setRating(0);
                if (data.reviewUser.success) {
                    toast.success(data.reviewUser.message);
                } else {
                    toast.error(data.reviewUser.message);
                }
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    };

    return (
        <div className="max-h-[500px] overflow-y-scroll bg-white p-4 dark:bg-[#343444]">
            {content && (
                <div>
                    <p>Đánh giá:</p>
                    <RatingStarInput
                        className="mb-4 mt-2"
                        rating={rating}
                        onRatingChange={handleRatingChange}
                    />
                </div>
            )}
            {reviews && (
                <div className="flex items-center">
                    <ReactTextareaAutosize
                        minRows={1}
                        maxRows={6}
                        placeholder={`Write your through about ${username}...`}
                        className="mr-4 h-[90px] w-full border p-[10px] text-black outline-none"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <Button
                        secondary
                        onClick={handleReview}
                        isLoading={loading}
                    >
                        Send
                    </Button>
                </div>
            )}

            {reviews &&
                reviews.map((review) => (
                    <div key={review.id} className="mb-8 mt-8">
                        {/* header */}
                        <div className="relative mb-4">
                            {/* user */}
                            <div className="flex items-center">
                                <div className="h-[40px] w-[40px] object-cover">
                                    <img
                                        src={
                                            review.assessor.avatar ||
                                            '/images/avatar-fallback.png'
                                        }
                                        alt="avatar"
                                        className="f-full w-full rounded-full"
                                    />
                                </div>
                                <p className="ml-4 font-light">
                                    {review.assessor.username}
                                </p>
                            </div>

                            {/* more */}
                            <div className="absolute right-0 top-2">
                                <Popover
                                    renderPopover={
                                        <MoreAction
                                            review={review as Review}
                                            setRating={setRating}
                                            setContent={setContent}
                                            refetch={refetch}
                                        />
                                    }
                                >
                                    <AiOutlineMore className="h-6 w-6 cursor-pointer transition-opacity hover:opacity-80" />
                                </Popover>
                            </div>
                        </div>
                        <RatingStar rating={review.rating} />
                        <span className="text-xs font-light">
                            {review.createdDate}
                        </span>
                        <p className="mt-2 text-sm font-light">
                            {review.content}
                        </p>
                    </div>
                ))}
        </div>
    );
};

interface RatingStarProps {
    className?: string;
    rating: number;
}

const RatingStar = ({ className, rating }: RatingStarProps) => {
    const yellowStars = rating;
    const grayStars = Array(5 - rating).fill(0);

    return (
        <div className={classNames('flex items-center', className)}>
            {yellowStars > 0 &&
                [...Array(yellowStars)].map((_, index) => (
                    <svg
                        key={`yellow-${index}`}
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Yellow star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            {grayStars.map((_, index) => (
                <svg
                    key={`gray-${index}`}
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-300 dark:text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>Gray star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
};

interface RatingInputProps {
    className: string;
    rating: number;
    onRatingChange: (score: number) => void;
}

const RatingStarInput = ({
    className,
    rating,
    onRatingChange,
}: RatingInputProps) => {
    const handleStarClick = (score: number) => {
        onRatingChange(score);
    };

    return (
        <div className={classNames('flex items-center', className)}>
            {[1, 2, 3, 4, 5].map((item) => {
                const isYellow = item <= rating;
                const starClassName = classNames('h-5 w-5 cursor-pointer', {
                    'text-gray-300 dark:text-gray-500': !isYellow,
                    'text-yellow-400': isYellow,
                });

                return (
                    <svg
                        key={item}
                        aria-hidden="true"
                        className={starClassName}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleStarClick(item)}
                    >
                        <title>{isYellow ? 'Yellow star' : 'Gray star'}</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                );
            })}
        </div>
    );
};

const MoreAction = ({
    review,
    setRating,
    setContent,
}: {
    review: Review;
    setRating: any;
    setContent: any;
    refetch: any;
}) => {
    // const { profile } = useAuthContext();
    const { data } = useMeQuery();
    const profile = data?.me;
    const [deleteReviewMutations] = useDeleteReviewMutation();

    const handleDeleteReview = () => {
        deleteReviewMutations({
            variables: {
                deleteReviewId: review.id,
            },
            onCompleted: (data) => {
                if (data.deleteReview.success) {
                    toast.success(data.deleteReview.message);
                } else {
                    toast.error(data.deleteReview.message);
                }
            },
        });
    };

    const handleUpdateReview = () => {
        setRating(review.rating);
        setContent(review.content);
    };

    return (
        <div className="bg-white">
            {profile && profile.id === review.assessor.id && (
                <>
                    <Button
                        className="flex-center bg-white px-6 py-3 hover:bg-gray-200"
                        iconClassName="mr-2"
                        onClick={handleDeleteReview}
                    >
                        Delete
                    </Button>
                    <Button
                        className="flex-center bg-white px-6 py-3 hover:bg-gray-200"
                        iconClassName="mr-2"
                        onClick={handleUpdateReview}
                    >
                        Update
                    </Button>
                </>
            )}
            <Button
                className="flex-center bg-white px-6 py-3 hover:bg-gray-200"
                iconClassName="mr-2"
            >
                Flag
            </Button>
        </div>
    );
};
