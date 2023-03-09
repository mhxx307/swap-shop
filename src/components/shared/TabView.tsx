import { ReactNode, useState } from 'react';

interface TabProps {
    label: string;
    content: ReactNode;
}

export interface TabViewProps {
    title?: string;
    tabs: TabProps[];
}

const TabView = ({ title, tabs = [] }: TabViewProps) => {
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
                            {tabs.map((tab, index) => (
                                <button
                                    key={index}
                                    className={`inline-block cursor-pointer rounded-t-lg p-4 transition-colors ${
                                        index === activeTabIndex
                                            ? 'bg-gray-300 text-blue-500 dark:bg-gray-800'
                                            : 'hover:bg-gray-300 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300'
                                    }`}
                                    onClick={() => setActiveTabIndex(index)}
                                >
                                    {tab.label}
                                </button>
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
