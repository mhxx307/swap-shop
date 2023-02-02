import { BaseLayoutProps } from '@/types/layoutTypes';
import { Header, Footer } from '@/components/partials';
import { Button, Search } from '../shared';
import { FaPencilAlt } from 'react-icons/fa';

const BaseLayout = ({
    children,
    showHeader = true,
    showFooter = true,
}: BaseLayoutProps) => {
    return (
        <main>
            {showHeader && (
                <>
                    <Header />
                    <div className="fixed wrapper z-[2] mt-[100px] right-0 flex items-center space-x-4">
                        <Search />
                        <Button
                            primary
                            LeftIcon={FaPencilAlt}
                            className="bg-yellow-500"
                            iconClassName="w-3 h-3"
                        >
                            Viết bài
                        </Button>
                    </div>
                </>
            )}
            <div className="app">{children}</div>
            {showFooter && <Footer />}
        </main>
    );
};

export default BaseLayout;
