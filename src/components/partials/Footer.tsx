import { NavList } from '@/components/shared';
import {
    ABOUT_FOOTER_NAV_LIST,
    CUSTOMER_FOOTER_NAV_LIST,
    SOCIAL_FOOTER_NAV_LIST,
} from '@/constants/vi';

const contents = [
    ABOUT_FOOTER_NAV_LIST,
    CUSTOMER_FOOTER_NAV_LIST,
    SOCIAL_FOOTER_NAV_LIST,
    SOCIAL_FOOTER_NAV_LIST,
];

const Footer = () => {
    return (
        <footer className="container border-t-2 grid py-[50px] grid-cols-2 sm:grid-cols-3 md:grid-cols-4  ">
            {contents.map((content) => (
                <NavList
                    navList={content}
                    className={
                        'flex flex-col md:[&>*:first-child]:text-[1.8rem] [&>*:first-child]:text-primary-500 mb-4'
                    }
                    itemClassName="ml-[0] text-[1.4rem]"
                />
            ))}
        </footer>
    );
};

export default Footer;
