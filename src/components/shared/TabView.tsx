import { useState } from 'react';
import { RiH4 } from 'react-icons/ri';

export interface TabViewProps {
    title?: string;
    tabs: any;
}

const TabView = ({ title, tabs = {} }: TabViewProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

    const activateTab = (index: number) => {
        setActiveTabIndex(index);
    };

    return (
        <div>
            {title && <h4>{title}</h4>}
            <div>
                {Object.keys(tabs).length === 0 ? (
                    <h3>No tabs</h3>
                ) : (
                    <>
                        <div className="space-x-6">
                            {tabs.map((tab: any, index: number) => (
                                <label
                                    key={index}
                                    className={`cursor-pointer inline-block p-4 rounded-t-lg ${
                                        index === activeTabIndex
                                            ? 'text-white dark:bg-gray-800 dark:text-blue-500'
                                            : 'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'
                                    }`}
                                    onClick={() => setActiveTabIndex(index)}
                                >
                                    {tab.label}
                                </label>
                            ))}
                        </div>
                        <div className="mt-[20px]">
                            {tabs[activeTabIndex].content}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TabView;
