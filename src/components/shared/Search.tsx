import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';

interface SearchProps {
    className?: string;
}

const Search = ({ className }: SearchProps) => {
    const [toggle, setToggle] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setToggle(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={ref}
            className={classNames(
                'flex h-[30px] cursor-pointer items-center rounded-[30px] bg-white py-[10px] px-[20px] shadow-md transition-all',
                className,
            )}
            onClick={() => setToggle(true)}
            role="button"
            tabIndex={0}
            aria-hidden="true"
        >
            <input
                type="text"
                placeholder="Search"
                className={`${
                    toggle ? 'w-[200px]' : 'w-0'
                } pr-[5px] text-base font-medium text-black caret-primary-500 outline-none transition-all`}
            />
            {toggle ? (
                <button onClick={() => router.push('/articles')}>
                    <BiSearchAlt2 className="text-primary-500" />
                </button>
            ) : (
                <BiSearchAlt2 className="text-primary-500" />
            )}
        </div>
    );
};

export default Search;
