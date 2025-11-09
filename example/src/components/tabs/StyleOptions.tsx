import React from 'react';
import { useMapSettings } from '../../MapSettingsContext';

const StyleOptions = () => {
  const {
    padding,
    borderColor,
    defaultFillColor,
    hoverStyle,
    setPadding,
    setBorderColor,
    setDefaultFillColor,
    setHoverStyle,
  } = useMapSettings();

  const timingOptions: Array<{ value: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'; label: string }> = [
    { value: 'linear', label: 'Linear' },
    { value: 'ease', label: 'Ease' },
    { value: 'ease-in', label: 'Ease In' },
    { value: 'ease-out', label: 'Ease Out' },
    { value: 'ease-in-out', label: 'Ease In-Out' },
  ];

  // Extract current values from hoverStyle.styles
  const currentStrokeWidth = (hoverStyle.styles?.strokeWidth as number) || 2;
  const currentTransform = (hoverStyle.styles?.transform as string) || 'scale(1.01)';
  const currentScale = parseFloat(currentTransform.match(/scale\(([\d.]+)\)/)?.[1] || '1.01');

  return (
    <div className='space-y-6'>
      {/* Map Style Section */}
      <div>
        <h3 className='text-sm font-semibold text-gray-700 mb-3'>Map Style</h3>
        <div className='grid grid-cols-3 gap-4'>
          {/* Padding Control */}
          <div className='flex flex-col space-y-2 col-span-2'>
            <label className='text-xs font-medium text-gray-600'>Padding</label>
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

      {/* Hover Effects Section */}
      <div>
        <div className='flex items-center justify-between mb-3'>
          <h3 className='text-sm font-semibold text-gray-700'>Hover Effects</h3>
          <label className='flex items-center gap-2 cursor-pointer'>
            <input
              type="checkbox"
              checked={hoverStyle.enabled}
              onChange={(e) => setHoverStyle({ ...hoverStyle, enabled: e.target.checked })}
              className='w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500'
            />
            <span className='text-xs font-medium text-gray-600'>Enabled</span>
          </label>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          {/* Stroke Width */}
          <div className='flex flex-col space-y-2'>
            <label className='text-xs font-medium text-gray-600'>Stroke Width</label>
            <div className='flex items-center gap-2'>
              <input
                type="range"
                min="1"
                max="5"
                step="0.5"
                value={currentStrokeWidth}
                onChange={(e) => setHoverStyle({
                  ...hoverStyle,
                  styles: {
                    ...hoverStyle.styles,
                    strokeWidth: Number(e.target.value)
                  }
                })}
                disabled={!hoverStyle.enabled}
                className='flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-50 disabled:cursor-not-allowed'
              />
              <span className='text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded min-w-[40px] text-center'>{currentStrokeWidth}</span>
            </div>
          </div>

          {/* Scale */}
          <div className='flex flex-col space-y-2'>
            <label className='text-xs font-medium text-gray-600'>Scale</label>
            <div className='flex items-center gap-2'>
              <input
                type="range"
                min="1"
                max="1.1"
                step="0.01"
                value={currentScale}
                onChange={(e) => setHoverStyle({
                  ...hoverStyle,
                  styles: {
                    ...hoverStyle.styles,
                    transform: `scale(${e.target.value})`
                  }
                })}
                disabled={!hoverStyle.enabled}
                className='flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-50 disabled:cursor-not-allowed'
              />
              <span className='text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded min-w-[40px] text-center'>{currentScale.toFixed(2)}</span>
            </div>
          </div>

          {/* Transition Duration */}
          <div className='flex flex-col space-y-2'>
            <label className='text-xs font-medium text-gray-600'>Duration (ms)</label>
            <div className='flex items-center gap-2'>
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={hoverStyle.transitionDuration}
                onChange={(e) => setHoverStyle({ ...hoverStyle, transitionDuration: Number(e.target.value) })}
                disabled={!hoverStyle.enabled}
                className='flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-50 disabled:cursor-not-allowed'
              />
              <span className='text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded min-w-[50px] text-center'>{hoverStyle.transitionDuration}</span>
            </div>
          </div>

          {/* Timing Function */}
          <div className='flex flex-col space-y-2'>
            <label className='text-xs font-medium text-gray-600'>Timing</label>
            <select
              value={hoverStyle.transitionTiming}
              onChange={(e) => setHoverStyle({ ...hoverStyle, transitionTiming: e.target.value as any })}
              disabled={!hoverStyle.enabled}
              className='text-xs border border-gray-300 px-2 py-1.5 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {timingOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        {!hoverStyle.enabled && (
          <div className='mt-3 p-2 bg-gray-50 rounded border border-gray-200'>
            <p className='text-xs text-gray-500 text-center'>Hover effects are disabled</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StyleOptions;
