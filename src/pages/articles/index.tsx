import { ClientOnly, Head } from '@/components/shared';

const List = [
    {
        id: 1,
        title: 'Article 1',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error, molestias.',
    },
    {
        id: 2,
        title: 'Article 1',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error, molestias.',
    },
    {
        id: 3,
        title: 'Article 1',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error, molestias.',
    },
    {
        id: 4,
        title: 'Article 1',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error, molestias.',
    },
    {
        id: 1,
        title: 'Article 1',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error, molestias.',
    },
    {
        id: 5,
        title: 'Article 1',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error, molestias.',
    },
    {
        id: 6,
        title: 'Article 1',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error, molestias.',
    },
];

const Articles = () => {
    return (
        <>
            <Head />
            <ClientOnly>
                <div className="mt-[100px]">
                    {/* <ArticlesBanner /> */}
                    {/* search & sort */}
                    {/* popular */}
                    <div className="grid grid-cols-4">
                        {List.map((article) => (
                            <div key={article.id} className="col-span-1">
                                <h3>{article.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </ClientOnly>
        </>
    );
};

export default Articles;
