import { BaseLayoutProps } from '@/types/layoutTypes';
import { Header, Footer } from '@/components/partials';

const BaseLayout = ({
    children,
    showHeader = true,
    showFooter = true,
}: BaseLayoutProps) => {
    return (
        <main>
            {showHeader && <Header />}
            <div className="app">{children}</div>
            {showFooter && <Footer />}
        </main>
    );
};

export default BaseLayout;
