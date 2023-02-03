import { forwardRef, memo } from 'react';
import Tippy from '@tippyjs/react';
import { Placement } from 'tippy.js';

import MenuItem from './MenuItem';
import PopupWrapper from './PopupWrapper';
import Header from './Header';
import { PopupMenuItemProps } from '@/types';
import ThemeSwitcher from '../ThemeSwitcher';

const defaultFn = () => {};

export interface PopupMenuProps {
    children: React.ReactElement | React.ReactNode;
    items: PopupMenuItemProps[];
    hideOnClick?: boolean;
    onChange?: (item: any) => void;
    title?: string;
    placement?: Placement;
}

// eslint-disable-next-line react/display-name
const PopupMenu = forwardRef<HTMLDivElement, PopupMenuProps>((props, ref) => {
    const {
        children,
        items = [],
        hideOnClick = false,
        onChange = defaultFn,
        title = '',
        placement = 'bottom-end',
    } = props;
    // const [history, setHistory] = useState<any[]>([{ data: items }]);
    // const current = history[history.length - 1];
    // current.data

    const renderItems = () => {
        return items.map((item: PopupMenuItemProps) => {
            // const isParent = !!item?.children;
            return (
                <MenuItem
                    data={item}
                    key={item.label}
                    className="dark:bg-black dark:text-white dark:hover:bg-white/10"
                    onClick={() => {
                        // if (isParent) {
                        //     setHistory((prev) => [...prev, item.children]);
                        // } else {
                        //     onChange(item);
                        // }
                        onChange(item);
                    }}
                />
            );
        });
    };

    // const handleResetToFirstMenu = () => {
    //     setHistory((prev) => prev.slice(0, 1));
    // };

    // const handleBack = () => {
    //     setHistory((prev) => prev.slice(0, history.length - 1));
    // };

    return (
        <div>
            <Tippy
                interactive={true}
                render={(attrs) => (
                    <div className="shadow-3xl" tabIndex={-1} {...attrs}>
                        <PopupWrapper className="pb-[8px]">
                            {/* {history.length > 1 && (
                                <Header title={current.title} onBack={handleBack} />
                            )} */}
                            {title && <Header title={title} />}
                            <div className="w-full">{renderItems()}</div>
                        </PopupWrapper>
                    </div>
                )}
                trigger="click"
                animation={false}
                zIndex={9999}
                // onHide={handleResetToFirstMenu}
                placement={placement}
                offset={[14, 10]}
                hideOnClick={hideOnClick}
            >
                <div ref={ref}>{children}</div>
            </Tippy>
        </div>
    );
});

export default memo(PopupMenu);
