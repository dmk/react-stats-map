import React, { useState } from 'react';
import DisplayOptions from './tabs/DisplayOptions';
import StyleOptions from './tabs/StyleOptions';
import ThresholdOptions from './tabs/ThresholdOptions';
import DataEditor from './tabs/DataEditor';

const TabControls = () => {
  const [activeTab, setActiveTab] = useState<'display' | 'style' | 'threshold' | 'data'>('data');

  const tabs = [
    {
      id: 'data' as const,
      label: 'Data',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      )
    },
    {
      id: 'display' as const,
      label: 'Display',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      id: 'style' as const,
      label: 'Style',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      id: 'threshold' as const,
      label: 'Thresholds',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
  ];

  return (
    <div className='h-full flex flex-col bg-white rounded-lg border border-gray-300 shadow-2xl overflow-hidden'>
      {/* Tabs Navigation */}
      <div className="border-b border-gray-300 px-3 py-2.5 bg-gray-50 flex-shrink-0">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className='flex-1 min-h-0 overflow-hidden'>
        {activeTab === 'data' && (
          <div className='h-full'>
            <DataEditor />
          </div>
        )}
        {activeTab === 'display' && (
          <div className='p-4 h-full overflow-y-auto'>
            <DisplayOptions />
          </div>
        )}
        {activeTab === 'style' && (
          <div className='p-4 h-full overflow-y-auto'>
            <StyleOptions />
          </div>
        )}
        {activeTab === 'threshold' && (
          <div className='p-4 h-full overflow-y-auto'>
            <ThresholdOptions />
          </div>
        )}
      </div>
    </div>
  );
};

export default TabControls;
