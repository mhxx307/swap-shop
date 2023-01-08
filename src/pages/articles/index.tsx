import { ArticleList } from '@/components/features/articles';
import { ClientOnly, Head } from '@/components/shared';

const List = [
    {
        id: 1,
        title: 'Article 1',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error, molestias.',
        image: 'https://images.unsplash.com/photo-1501829385782-9841539fa6bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dmludGFnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
        id: 2,
        title: 'Article 1',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error, molestias.',
        image: 'https://images.unsplash.com/photo-1501829385782-9841539fa6bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dmludGFnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
        id: 3,
        title: 'Article 1',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error, molestias.',
        image: 'https://images.unsplash.com/photo-1501829385782-9841539fa6bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dmludGFnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
        id: 4,
        title: 'Article 1',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error, molestias.',
        image: 'https://images.unsplash.com/photo-1501829385782-9841539fa6bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dmludGFnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
        id: 1,
        title: 'Article 1',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error, molestias.',
        image: 'https://images.unsplash.com/photo-1501829385782-9841539fa6bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dmludGFnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
        id: 5,
        title: 'Article 1',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error, molestias.',
        image: 'https://images.unsplash.com/photo-1501829385782-9841539fa6bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dmludGFnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
        id: 6,
        title: 'Article 1',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error, molestias.',
        image: 'https://images.unsplash.com/photo-1501829385782-9841539fa6bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dmludGFnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    },
];

const Articles = () => {
    return (
        <>
            <Head />
            <ClientOnly>
                <div className="mt-[80px] wrapper">
                    {/* <ArticlesBanner /> */}
                    {/* search & sort */}
                    <h3>Banner</h3>
                    <h3>Options</h3>
                    <h3>Sort</h3>
                    <h3>Search</h3>
                    <ArticleList
                        title="Tin đăng mới"
                        articleList={List}
                        className="mt-[20px]"
                        titleClassName="mb-[10px]"
                    />
                    <ArticleList
                        title="Tin phổ biến"
                        articleList={List}
                        className="mt-[20px]"
                        titleClassName="mb-[10px]"
                    />
                </div>
            </ClientOnly>
        </>
    );
};

export default Articles;
