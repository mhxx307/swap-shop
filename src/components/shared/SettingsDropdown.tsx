import { useEffect, useRef, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavItemProps } from '@/types';
interface DropdownProps {
    dataList: NavItemProps[];
    className?: string;
}

const SettingsDropdown = ({ dataList, className }: DropdownProps) => {
    const [inputValue, setInputValue] = useState('');
    const [selected, setSelected] = useState('profile');
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const pathArr = router.pathname.split('/');
        const selected = pathArr.slice(-1)[0];
        setSelected(selected);

        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
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
            <button
                onClick={() => setOpen(!open)}
                className={`flex w-full items-center justify-between rounded bg-white py-4 pl-[20px] ${
                    !selected && 'text-gray-700'
                }`}
            >
                <span className="font-bold capitalize text-black">
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
            </button>
            <ul
                className={`mt-2 overflow-y-auto rounded-md bg-white ${
                    open ? 'max-h-60' : 'max-h-0'
                } `}
            >
                <div className="sticky top-0 flex items-center border-b-[1px] border-b-[#eee] bg-white px-2">
                    <AiOutlineSearch size={18} className="text-gray-700" />
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) =>
                            setInputValue(e.target.value.toLowerCase())
                        }
                        placeholder="Search"
                        className="p-2 text-black outline-none placeholder:text-gray-500"
                    />
                </div>
                {dataList?.map((item) => (
                    <Link
                        key={item?.label}
                        href={item?.path}
                        className={`border-b-[1px] border-b-[#eee] py-4 pl-[20px] text-xl font-normal capitalize transition-colors
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

export default SettingsDropdown;
