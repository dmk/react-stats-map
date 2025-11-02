import React from 'react';
import { useMapSettings } from '../../MapSettingsContext';

const StyleOptions = () => {
  const {
    padding,
    borderColor,
    defaultFillColor,
    setPadding,
    setBorderColor,
    setDefaultFillColor,
  } = useMapSettings();

  return (
    <div>
      <div className='grid grid-cols-3 gap-4'>
        {/* Padding Control */}
        <div className='flex flex-col space-y-2 col-span-2'>
          <label className='text-xs font-medium text-gray-600'>Map Padding</label>
          <div className='flex items-center gap-2'>
            <input
              type="range"
              min="0"
              max="100"
              value={padding}
              onChange={(e) => setPadding(Number(e.target.value))}
              className='flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600'
            />
            <span className='text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded min-w-[50px] text-center'>{padding}px</span>
          </div>
        </div>

        {/* Border Color Control */}
        <div className='flex flex-col space-y-2'>
          <label className='text-xs font-medium text-gray-600'>Border</label>
          <div className='flex items-center gap-2'>
            <input
              type="color"
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
              className='w-12 h-8 rounded cursor-pointer border border-gray-300'
            />
            <span className='text-xs font-mono text-gray-600'>{borderColor}</span>
          </div>
        </div>

        {/* Default Fill Color Control */}
        <div className='flex flex-col space-y-2 col-span-3'>
          <label className='text-xs font-medium text-gray-600'>Default Fill Color</label>
          <div className='flex items-center gap-2'>
            <input
              type="color"
              value={defaultFillColor}
              onChange={(e) => setDefaultFillColor(e.target.value)}
              className='w-12 h-8 rounded cursor-pointer border border-gray-300'
            />
            <span className='text-xs font-mono text-gray-600'>{defaultFillColor}</span>
            <span className='text-xs text-gray-500'>- for regions without data</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleOptions;
