import { useState } from 'react';
const TabSwitcher = ({ tabs }: any) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    return (
        <div className=''>
            <ul className='flex space-x-4'>
                {tabs.map((tab: any, index: number) => (
                    <li
                        key={index}
                        className={`cursor-pointer px-4 py-2 rounded w-full ${
                            index === activeTab
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => handleTabClick(index)}
                    >
                        {tab.label}
                    </li>
                ))}
            </ul>
            <div className='mt-4'>{tabs[activeTab].content}</div>
        </div>
    );
};

export default TabSwitcher;
