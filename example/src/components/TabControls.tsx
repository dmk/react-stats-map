// TabControls.tsx
import React, { useState } from 'react';
import { useMapSettings } from '../MapSettingsContext';

const TabControls = () => {
  const {
    title,
    valueName,
    padding,
    hideTitle,
    hideLegend,
    borderColor,
    defaultFillColor,
    setTitle,
    setValueName,
    setPadding,
    setHideTitle,
    setHideLegend,
    setBorderColor,
    setDefaultFillColor,
  } = useMapSettings();

  const [activeTab, setActiveTab] = useState<'display' | 'style'>('display');

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
      </div>

      {/* Tab Content */}
      <div className='w-full h-1/4 overflow-y-auto bg-white p-4 rounded-lg shadow-md'>
        {activeTab === 'display' && (
          <div>
            <h3 className='text-lg font-semibold mb-4'>Map Display Options</h3>
            <div className='grid grid-cols-2 gap-4'>
              {/* Title Control */}
              <div className='flex flex-col'>
                <label className='text-sm font-medium'>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='border p-1 rounded focus:ring-2 focus:ring-blue-400'
                />
              </div>

              {/* Value Name Control */}
              <div className='flex flex-col'>
                <label className='text-sm font-medium'>Value Name</label>
                <input
                  type="text"
                  value={valueName}
                  onChange={(e) => setValueName(e.target.value)}
                  className='border p-1 rounded focus:ring-2 focus:ring-blue-400'
                />
              </div>

              {/* Hide Title and Hide Legend Controls */}
              <div className='flex items-center space-x-4'>
                <div className='flex items-center'>
                  <input
                    type="checkbox"
                    checked={hideTitle}
                    onChange={(e) => setHideTitle(e.target.checked)}
                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                  />
                  <label className='ml-2 text-sm font-medium'>Hide Title</label>
                </div>

                <div className='flex items-center'>
                  <input
                    type="checkbox"
                    checked={hideLegend}
                    onChange={(e) => setHideLegend(e.target.checked)}
                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                  />
                  <label className='ml-2 text-sm font-medium'>Hide Legend</label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'style' && (
          <div>
            <h3 className='text-lg font-semibold mb-4'>Style Options</h3>
            <div className='grid grid-cols-2 gap-4'>
              {/* Padding Control */}
              <div className='flex flex-col'>
                <label className='text-sm font-medium'>Padding</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={padding}
                  onChange={(e) => setPadding(Number(e.target.value))}
                  className='mt-2 w-2/3'
                />
                <span className='text-sm'>{padding}px</span>
              </div>

              {/* Border Color Control */}
              <div className='flex flex-col'>
                <label className='text-sm font-medium'>Border Color</label>
                <input
                  type="color"
                  value={borderColor}
                  onChange={(e) => setBorderColor(e.target.value)}
                  className='w-12 h-6'
                />
              </div>

              {/* Default Fill Color Control */}
              <div className='flex flex-col'>
                <label className='text-sm font-medium'>Default Fill Color</label>
                <input
                  type="color"
                  value={defaultFillColor}
                  onChange={(e) => setDefaultFillColor(e.target.value)}
                  className='w-12 h-6'
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TabControls;
