import { useState, forwardRef } from 'react';
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
    const [history, setHistory] = useState<any[]>([{ data: items }]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item: any, index: number) => {
            const isParent = !!item?.children;
            return (
                <MenuItem
                    data={item}
                    key={index}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleResetToFirstMenu = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, history.length - 1));
    };

    return (
        <Tippy
            interactive={true}
            render={(attrs) => (
                <div className="w-[244px] shadow-md" tabIndex={-1} {...attrs}>
                    <PopupWrapper className="pb-[8px]">
                        {history.length > 1 && (
                            <Header title={current.title} onBack={handleBack} />
                        )}
                        <div className="w-full">{renderItems()}</div>
                    </PopupWrapper>
                </div>
            )}
            trigger="click"
            animation={false}
            zIndex={9999}
            onHide={handleResetToFirstMenu}
            placement="bottom-end"
            offset={[14, 10]}
            hideOnClick={hideOnClick}
        >
            <div ref={ref}>{children}</div>
        </Tippy>
    );
});

export default PopupMenu;
