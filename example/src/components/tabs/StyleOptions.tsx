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
  );
};

export default StyleOptions;
