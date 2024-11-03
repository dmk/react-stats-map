import React, { useMemo } from 'react';
import { useMapSettings } from '../../MapSettingsContext';
import { ThresholdColor } from '@dkkoval/react-stats-map';

const ThresholdOptions = () => {
  const { data, thresholdColors, setThresholdColors } = useMapSettings();

  const maxValue = useMemo(() => Math.max(...Object.values(data)), [data]);

  const defaultThresholdColors: ThresholdColor[] = useMemo(() => {
    if (!thresholdColors) {
      const stepSize = maxValue / 5;
      const defaultColors = ['#34d399', '#10b981', '#059669', '#047857', '#065f46'];

      return Array.from({ length: 5 }, (_, i) => ({
        threshold: Math.round((i + 1) * stepSize),
        color: defaultColors[i],
      }));
    }
    return thresholdColors;
  }, [thresholdColors, maxValue]);

  if (!setThresholdColors) {
    throw new Error('setThresholdColors must be defined in MapSettingsContext');
  }

  const handleThresholdChange = (index: number, newThreshold: number) => {
    if (!thresholdColors) return;
    const updatedThresholdColors = [...thresholdColors];
    updatedThresholdColors[index] = {
      ...updatedThresholdColors[index],
      threshold: newThreshold,
    };
    setThresholdColors?.(updatedThresholdColors);
  };

  const handleColorChange = (index: number, newColor: string) => {
    if (!thresholdColors) return;
    const updatedThresholdColors = [...thresholdColors];
    updatedThresholdColors[index] = {
      ...updatedThresholdColors[index],
      color: newColor,
    };
    setThresholdColors(updatedThresholdColors);
  };

  const addThreshold = () => {
    setThresholdColors?.([...(thresholdColors || []), { threshold: 0, color: '#000000' }]);
  };

  const removeThreshold = (index: number) => {
    if (!thresholdColors) return;
    const updatedThresholdColors = thresholdColors.filter((_, i) => i !== index);
    setThresholdColors(updatedThresholdColors);
  };

  if (!thresholdColors && setThresholdColors) {
    setThresholdColors(defaultThresholdColors);
  }

  return (
    <div>
      <h3 className='text-lg font-semibold mb-4'>Threshold Options</h3>
      <div className='flex flex-col gap-4'>
        {thresholdColors?.map((thresholdColor: ThresholdColor, index: number) => (
          <div key={index} className='flex items-center gap-4'>
            <div className='flex flex-col'>
              <label className='text-sm font-medium'>Threshold {index + 1}</label>
              <input
                type='number'
                value={thresholdColor.threshold}
                onChange={(e) => handleThresholdChange(index, Number(e.target.value))}
                className='border p-1 rounded focus:ring-2 focus:ring-blue-400'
              />
            </div>
            <div className='flex flex-col'>
              <label className='text-sm font-medium'>Color</label>
              <input
                type='color'
                value={thresholdColor.color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                className='w-12 h-6'
              />
            </div>
            <button
              onClick={() => removeThreshold(index)}
              className='text-red-600 hover:text-red-800 text-sm'
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addThreshold}
          className='mt-4 py-1 px-3 bg-emerald-600 text-white rounded-full text-sm hover:bg-emerald-700'
        >
          Add Threshold
        </button>
      </div>
    </div>
  );
};

export default ThresholdOptions;
