import React, { useState } from 'react';
import DisplayOptions from './tabs/DisplayOptions';
import StyleOptions from './tabs/StyleOptions';
import ThresholdOptions from './tabs/ThresholdOptions';

const TabControls = () => {
  const [activeTab, setActiveTab] = useState<'display' | 'style' | 'threshold'>('display');

  return (
    <>
      {/* Tabs Navigation */}
      <div className="w-full flex justify-center space-x-2 mb-4">
        <button
          className={`py-1 px-3 rounded-full text-sm ${
            activeTab === 'display' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}
          onClick={() => setActiveTab('display')}
        >
          Map Display Options
        </button>
        <button
          className={`py-1 px-3 rounded-full text-sm ${
            activeTab === 'style' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}
          onClick={() => setActiveTab('style')}
        >
          Style Options
        </button>
        <button
          className={`py-1 px-3 rounded-full text-sm ${
            activeTab === 'threshold' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}
          onClick={() => setActiveTab('threshold')}
        >
          Threshold Options
        </button>
      </div>

      {/* Tab Content */}
      <div className='w-full h-1/4 overflow-y-auto bg-white p-4 rounded-lg shadow-md'>
        {activeTab === 'display' && <DisplayOptions />}
        {activeTab === 'style' && <StyleOptions />}
        {activeTab === 'threshold' && <ThresholdOptions />}
      </div>
    </>
  );
};

export default TabControls;
