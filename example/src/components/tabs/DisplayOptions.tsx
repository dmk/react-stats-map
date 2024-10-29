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
  );
};

export default DisplayOptions;
