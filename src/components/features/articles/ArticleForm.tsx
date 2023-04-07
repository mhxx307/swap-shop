import { ImageUpload } from '@/components/features/uploads';
import { Auth, Button, FormSelect, InputField } from '@/components/shared';
import { path, STATUS_ARTICLE } from '@/constants';
import {
    Article,
    InsertArticleInput,
    useArticleQuery,
    useCategoriesQuery,
    useInsertArticleMutation,
    useMeQuery,
    useUpdateArticleMutation,
} from '@/generated/graphql';
import { storage } from '@/libs/firebase';
import {
    createAttachmentUrl,
    createFileFromUrl,
    formatCurrency,
} from '@/utils';
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes,
} from 'firebase/storage';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { Control, Controller, FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import 'react-quill/dist/quill.snow.css';
import TimeAgo from 'timeago-react';
import { BsFillPlayFill } from 'react-icons/bs';

const prices = [
    { id: 1, label: 'Free' },
    { id: 2, label: 'Charges' },
];

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image'],
        ['clean'],
    ],
};

const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
];

function ArticleForm({ id }: { id?: string }) {
    const ReactQuill = useMemo(
        () => dynamic(() => import('react-quill'), { ssr: false }),
        [],
    );
    const router = useRouter();
    const [files, setFiles] = useState<File[]>([]);
    const [checked, setChecked] = useState(1);

    const { data: meData } = useMeQuery();
    const me = meData?.me;

    const { data: articleDataUpdate } = useArticleQuery({
        variables: {
            articleId: id as string,
        },
        skip: !id,
    });
    const { data: categoriesData } = useCategoriesQuery();

    const categories = categoriesData?.categories;
    const article = articleDataUpdate?.article;
    const categoriesIdByArticle =
        article && article.categories.map((category) => category.id);

    const { control, handleSubmit, watch } = useForm<
        Omit<InsertArticleInput, 'images'>
    >({
        defaultValues: {
            title: article?.title ? article.title : '',
            description: article?.description ? article.description : '',
            productName: article?.productName ? article.productName : '',
            categoryIds: categoriesIdByArticle ? categoriesIdByArticle : [''],
            price: article?.price ? article.price : 0,
        },
    });

    const [createArticle, { loading }] = useInsertArticleMutation();
    const [updateArticle] = useUpdateArticleMutation();

    const articleWatch = {
        title: watch('title'),
        description: watch('description'),
        productName: watch('productName'),
        thumbnail: files[0]
            ? URL.createObjectURL(files[0])
            : '/images/avatar-fallback.png',
        price: watch('price'),
        images: [''],
        user: me,
    };

    useEffect(() => {
        article?.images.forEach((image) => {
            createFileFromUrl(image, image).then((file) => {
                setFiles((prev) => [...prev, file]);
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmitArticle = async (
        payload: Omit<InsertArticleInput, 'images'>,
    ) => {
        if (!article) {
            const urlArticles: string[] = [];
            for (const file of files) {
                const fileRef = ref(storage, `articles/${file.name + v4()}`);
                const upload = await uploadBytes(fileRef, file);
                const url = await getDownloadURL(upload.ref);
                urlArticles.push(url);
            }

            if (urlArticles.length > 0) {
                await createArticle({
                    variables: {
                        insertArticleInput: {
                            title: payload.title,
                            description: payload.description,
                            productName: payload.productName,
                            images: urlArticles,
                            categoryIds: payload.categoryIds,
                            price: Number(payload.price),
                        },
                    },
                });
            } else {
                toast.error('Please upload an image article');
                return;
            }

            router.push(path.home);
        } else {
            const images = article.images;
            if (images.length > 0) {
                for (const image of images) {
                    const oldImageRef = ref(
                        storage,
                        createAttachmentUrl(image, 'articles'),
                    );
                    await deleteObject(oldImageRef);
                }
            }
            const urlArticles: string[] = [];
            for (const file of files) {
                const fileRef = ref(storage, `articles/${file.name + v4()}`);
                const upload = await uploadBytes(fileRef, file);
                const url = await getDownloadURL(upload.ref);
                urlArticles.push(url);
            }

            await updateArticle({
                variables: {
                    updateArticleInput: {
                        id: articleDataUpdate.article?.id as string,
                        title: payload.title,
                        description: payload.description,
                        productName: payload.productName,
                        images: urlArticles,
                        categoryIds: payload.categoryIds,
                        price: Number(payload.price),
                        status: STATUS_ARTICLE.PENDING,
                    },
                },
            });
        }
    };

    return (
        <Auth>
            <section className="container bg-white dark:bg-primaryDark">
                <div className="mt-12 grid grid-cols-12">
                    <div className="col-span-6 mr-6 md:col-span-4 lg:col-span-3">
                        <h5 className="text-light mb-4">Preview Item</h5>
                        {articleWatch && (
                            <ArticleCard article={articleWatch as Article} />
                        )}
                    </div>
                    <div className="col-span-6 md:col-span-8 lg:col-span-9">
                        <div>
                            <form
                                action="#"
                                onSubmit={handleSubmit(handleSubmitArticle)}
                                className="space-y-4"
                            >
                                <div className="space-y-6">
                                    <div className="mb-[15px]">
                                        <InputField
                                            control={control}
                                            type="text"
                                            label="Title:"
                                            name="title"
                                            placeholder="Title"
                                        />
                                    </div>

                                    <div className="">
                                        <InputField
                                            control={control}
                                            type="text"
                                            label="Product:"
                                            name="productName"
                                            placeholder="Product name"
                                        />
                                    </div>

                                    <div>
                                        <span className="text-sm">Price:</span>
                                        <PriceOptions
                                            checked={checked}
                                            setChecked={setChecked}
                                        />
                                        <InputField
                                            control={control}
                                            type="number"
                                            name="price"
                                            placeholder="Price"
                                            disabled={checked === 1}
                                        />
                                    </div>

                                    <div>
                                        <FormSelect
                                            control={
                                                control as unknown as Control<FieldValues>
                                            }
                                            defaultValue={''}
                                            name="categoryIds"
                                            selectProps={{
                                                placeholder: 'Category',
                                                options: categories
                                                    ? categories.map(
                                                          (category) => ({
                                                              value: category.id,
                                                              label: category.name,
                                                          }),
                                                      )
                                                    : [],
                                                isMulti: true,
                                            }}
                                            label="Category"
                                        />
                                    </div>

                                    <div className="">
                                        <p>Images:</p>
                                        <ImageUpload
                                            initialFiles={files}
                                            onChange={setFiles}
                                            multiple
                                            value={files.filter(
                                                (file, index, self) =>
                                                    index ===
                                                    self.findIndex(
                                                        (f) =>
                                                            f.name ===
                                                            file.name,
                                                    ),
                                            )}
                                        />
                                    </div>

                                    <div className="">
                                        <label htmlFor="description">
                                            Description
                                        </label>
                                        <Controller
                                            control={control}
                                            name="description"
                                            render={({
                                                field: {
                                                    onChange,
                                                    onBlur,
                                                    value,
                                                },
                                            }) => (
                                                <ReactQuill
                                                    theme="snow"
                                                    value={value}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    modules={modules}
                                                    formats={formats}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>

                                <Button
                                    primary
                                    isLoading={loading}
                                    type="submit"
                                >
                                    Add product
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Auth>
    );
}

export default ArticleForm;

const PriceOptions = ({
    checked,
    setChecked,
}: {
    checked: number;
    setChecked: any;
}) => {
    return (
        <div className="mb-2 flex items-center space-x-2">
            <span className="text-sm">Options: </span>
            {prices.map((item) => {
                return (
                    <div key={item.id} className="flex items-center text-sm">
                        <label htmlFor="">{item.label}</label>
                        <input
                            type="radio"
                            checked={checked === item.id}
                            onChange={() => setChecked(item.id)}
                        />
                    </div>
                );
            })}
        </div>
    );
};

const ArticleCard = ({ article }: { article: any }) => {
    return (
        <div className="rounded-[10px] bg-white p-[20px] shadow dark:bg-[#343444]">
            {/* image */}
            <div className="relative pt-[calc(95%)]">
                <img
                    src={article.thumbnail}
                    alt="article"
                    className="absolute top-0 h-full w-full rounded-[10px]"
                />
            </div>

            <div className="">
                <span className="my-[8px] block text-[10px] font-normal text-[#919eab] line-clamp-1">
                    <TimeAgo datetime={article.createdDate} />{' '}
                    {article.user.address}
                </span>

                <div className="space-y-4">
                    <h5 className="truncate text-sm hover:underline">
                        {article.title}
                    </h5>

                    <div className="flex">
                        {/* avatar */}
                        <div className="mr-[18px] h-[40px] w-[40px] flex-shrink-0 cursor-pointer object-cover">
                            <img
                                src={
                                    article.user.avatar ||
                                    '/images/avatar-fallback.png'
                                }
                                alt={article.user.username}
                                className="w-full rounded-full "
                            />
                        </div>

                        {/* content */}
                        <div className="flex w-full items-center justify-between">
                            <div className="space-y-2">
                                <h6 className="text-xs text-[#919eab]">
                                    Created By
                                </h6>
                                <p className="text-xs">
                                    {article.user.username}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h6 className="text-xs text-[#919eab]">
                                    Price
                                </h6>
                                <p className="text-xs">
                                    {article.price
                                        ? `đ ${formatCurrency(article.price)}`
                                        : 'Free'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-[18px] flex items-center justify-between">
                    <Button
                        secondary
                        className="rounded-full px-6 text-white"
                        LeftIcon={BsFillPlayFill}
                    >
                        Xem
                    </Button>
                    <span className="truncate text-xs">address</span>
                </div>
            </div>
        </div>
    );
};
