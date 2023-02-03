import classNames from 'classnames';
import Hamburger from 'hamburger-react';
import Link from 'next/link';
import { useState } from 'react';

export interface HamburgerNavbarProps {
    data: any;
    className: string;
}

const HamburgerNavbar = ({ data, className }: HamburgerNavbarProps) => {
    let [open, setOpen] = useState(false);

    return (
        <div className={classNames('', className)}>
            <Hamburger toggled={open} toggle={setOpen} />

            <ul
                className={`pb-12 absolute bg-white z-[-1] left-0 w-full pl-9 transition-all duration-300 ease-in ${
                    open ? 'top-[100%]' : 'top-[-490px]'
                }`}
            >
                {data.map((item: any, index: number) => (
                    <li key={index} className="md:ml-8 text-xl md:my-0 my-7">
                        <Link
                            href={item.path}
                            className="text-gray-800 hover:text-gray-400 duration-500"
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
