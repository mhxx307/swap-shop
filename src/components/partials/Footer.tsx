import { NavList } from '@/components/shared';
import { useConstantsTranslation } from '@/hooks';

const Footer = () => {
    const { FOOTER_LIST }: any = useConstantsTranslation();
    return (
        <footer className="container border-t-2 py-[50px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  ">
            {FOOTER_LIST.map((content: any, index: number) => (
                <NavList
                    key={index}
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
