import { useRouter } from 'next/router';
import Link from 'next/link';
import { removeSpecialCharacter, validateNameId } from '@/utils';

const Breadcrumb = () => {
    const router = useRouter();
    const path = router.asPath.split('/');

    console.log(path);

    return (
        <nav className="font-medium text-gray-500" aria-label="Breadcrumb">
            <ol className="inline-flex list-none p-0">
                {path.map((crumb, index) => {
                    if (!crumb) {
                        return null;
                    }

                    const href = `/${path.slice(1, index + 1).join('/')}`;

                    const isNameId = validateNameId(crumb);
                    let crumbResult = '';
                    if (isNameId) {
                        // crumbResult = removeSpecialCharacter(crumb).replace(
                        //     /\s/g,
                        //     ' ',
                        // );
                        crumbResult = 'Name id';
                    } else if (crumb === '' || crumb === '/') {
                        crumbResult = 'Home';
                    } else {
                        crumbResult = crumb;
                    }

                    console.log(crumbResult, isNameId);

                    return (
                        <li key={href} className="flex items-center">
                            <svg
                                className="mr-2 h-3 w-3 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                            <Link href={href}>
                                <span className="text-gray-700 hover:text-gray-900">
                                    {crumbResult}
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
