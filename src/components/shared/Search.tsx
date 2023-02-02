import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';

export interface SearchProps {}

const Search = (props: SearchProps) => {
    const [toggle, setToggle] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
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
            className="bg-white h-[30px] rounded-[30px] py-[10px] px-[20px] flex items-center transition-all shadow-3xl cursor-pointer"
            onClick={() => setToggle(true)}
        >
            <input
                type="text"
                placeholder="Search"
                className={`${
                    toggle ? 'w-[200px]' : 'w-0'
                } font-medium text-base transition-all outline-none text-black caret-primary-500 pr-[5px]`}
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
