import React from 'react';
import { useMapSettings } from '../../MapSettingsContext';

const DisplayOptions = () => {
  const {
    title,
    valueName,
    hideTitle,
    hideLegend,
    setTitle,
    setValueName,
    setHideTitle,
    setHideLegend,
  } = useMapSettings();

  return (
    <div>
      <div className='grid grid-cols-1 gap-4'>
        {/* Title Control */}
        <div className='flex flex-col space-y-1'>
          <label className='text-xs font-medium text-gray-600'>Map Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title..."
            className='border border-gray-300 px-2 py-1.5 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none'
          />
        </div>

        {/* Value Name Control */}
        <div className='flex flex-col space-y-1'>
          <label className='text-xs font-medium text-gray-600'>Value Label</label>
          <input
            type="text"
            value={valueName}
            onChange={(e) => setValueName(e.target.value)}
            placeholder="Enter label..."
            className='border border-gray-300 px-2 py-1.5 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none'
          />
        </div>
      </div>

      {/* Hide Title and Hide Legend Controls */}
      <div className='flex items-center gap-4 mt-4'>
        <label className='flex items-center cursor-pointer'>
          <input
            type="checkbox"
            checked={hideTitle}
            onChange={(e) => setHideTitle(e.target.checked)}
            className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
          />
          <span className='ml-2 text-xs text-gray-700'>Hide Title</span>
        </label>

        <label className='flex items-center cursor-pointer'>
          <input
            type="checkbox"
            checked={hideLegend}
            onChange={(e) => setHideLegend(e.target.checked)}
            className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
          />
          <span className='ml-2 text-xs text-gray-700'>Hide Legend</span>
        </label>
      </div>
    </div>
  );
};

export default DisplayOptions;
