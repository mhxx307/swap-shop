import { useState, forwardRef, memo } from 'react';
import Tippy from '@tippyjs/react';

import MenuItem from './MenuItem';
import PopupWrapper from './PopupWrapper';
import Header from './Header';
import { PopupMenuItemProps } from '@/types';

const defaultFn = () => {};

export interface PopupMenuProps {
    children: React.ReactElement | React.ReactNode;
    items: PopupMenuItemProps[];
    hideOnClick?: boolean;
    onChange?: (item: any) => void;
}

// eslint-disable-next-line react/display-name
const PopupMenu = forwardRef<HTMLDivElement, PopupMenuProps>((props, ref) => {
    const {
        children,
        items = [],
        hideOnClick = false,
        onChange = defaultFn,
    } = props;
    // const [history, setHistory] = useState<any[]>([{ data: items }]);
    // const current = history[history.length - 1];
    // current.data

    const renderItems = () => {
        return items.map((item: any, index: number) => {
            // const isParent = !!item?.children;
            return (
                <MenuItem
                    data={item}
                    key={index}
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
        <Tippy
            interactive={true}
            render={(attrs) => (
                <div
                    className="min-w-[100px] sm:min-w-[200px] md:min-w-[244px] shadow-md"
                    tabIndex={-1}
                    {...attrs}
                >
                    <PopupWrapper className="pb-[8px]">
                        {/* {history.length > 1 && (
                            <Header title={current.title} onBack={handleBack} />
                        )} */}
                        <div className="w-full">{renderItems()}</div>
                    </PopupWrapper>
                </div>
            )}
            trigger="click"
            animation={false}
            zIndex={9999}
            // onHide={handleResetToFirstMenu}
            placement="bottom-end"
            offset={[14, 10]}
            hideOnClick={hideOnClick}
        >
            <div ref={ref}>{children}</div>
        </Tippy>
    );
});

export default memo(PopupMenu);
