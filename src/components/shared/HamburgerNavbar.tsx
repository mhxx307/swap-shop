import { PopupMenuItemProps } from '@/types';
import classNames from 'classnames';
import Hamburger from 'hamburger-react';
import Link from 'next/link';
import { useState } from 'react';

export interface HamburgerNavbarProps {
    data: PopupMenuItemProps[];
    className: string;
}

const HamburgerNavbar = ({ data, className }: HamburgerNavbarProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={classNames('', className)}>
            <Hamburger toggled={open} toggle={setOpen} />

            <ul
                className={`absolute left-0 z-[-1] w-full bg-white pb-12 pl-9 transition-all duration-300 ease-in ${
                    open ? 'top-[100%]' : 'top-[-490px]'
                }`}
            >
                {data.map((item, index) => (
                    <li key={index} className="my-7 text-xl md:my-0 md:ml-8">
                        <Link
                            href={item.path as string}
                            className="text-gray-800 duration-500 hover:text-gray-400"
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HamburgerNavbar;
