import { useState } from 'react';

export interface TabViewProps {
    title?: string;
    tabs: any;
}

const TabView = ({ title, tabs = {} }: TabViewProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

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
                                    className={`cursor-pointer inline-block p-4 rounded-t-lg transition-colors ${
                                        index === activeTabIndex
                                            ? 'text-blue-500 bg-gray-300 dark:bg-gray-800'
                                            : 'hover:text-gray-600 hover:bg-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-300'
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
