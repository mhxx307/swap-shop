import { useEffect, useRef, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface DropdownProps {
    dataList: any[];
    className?: string;
}

const Dropdown = ({ dataList, className }: DropdownProps) => {
    const [inputValue, setInputValue] = useState('');
    const [selected, setSelected] = useState('profile');
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const pathArr = router.pathname.split('/');
        const selected = pathArr.slice(-1)[0];
        setSelected(selected);

        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, router.pathname]);

    return (
        <div className={classNames('w-full font-medium', className)} ref={ref}>
            <div
                onClick={() => setOpen(!open)}
                className={`bg-white w-full py-4 pl-[20px] flex items-center justify-between rounded ${
                    !selected && 'text-gray-700'
                }`}
            >
                <span className="font-bold text-black capitalize">
                    {selected
                        ? selected?.length > 25
                            ? selected?.substring(0, 25) + '...'
                            : selected
                        : 'Profile'}
                </span>
                <BiChevronDown
                    size={20}
                    className={`${open && 'rotate-180'} text-black`}
                />
            </div>
            <ul
                className={`rounded-md bg-white mt-2 overflow-y-auto ${
                    open ? 'max-h-60' : 'max-h-0'
                } `}
            >
                <div className="flex items-center px-2 sticky top-0 bg-white border-b-[1px] border-b-[#eee]">
                    <AiOutlineSearch size={18} className="text-gray-700" />
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) =>
                            setInputValue(e.target.value.toLowerCase())
                        }
                        placeholder="Search"
                        className="placeholder:text-gray-500 p-2 outline-none text-black"
                    />
                </div>
                {dataList?.map((item) => (
                    <Link
                        key={item?.label}
                        href={item?.path}
                        className={`py-4 pl-[20px] text-xl font-normal capitalize transition-colors border-b-[1px] border-b-[#eee]
            ${
                item?.label?.toLowerCase() === selected?.toLowerCase() &&
                'text-black'
            }
            ${
                item?.label?.toLowerCase().startsWith(inputValue)
                    ? 'block'
                    : 'hidden'
            }`}
                        onClick={() => {
                            if (
                                item?.label?.toLowerCase() !==
                                selected.toLowerCase()
                            ) {
                                setSelected(item?.label);
                                setOpen(false);
                                setInputValue('');
                            }
                        }}
                    >
                        {item?.label}
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default Dropdown;
