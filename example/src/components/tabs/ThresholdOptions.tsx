import React, { useEffect, useMemo, useRef } from 'react';
import { useMapSettings } from '../../MapSettingsContext';
import { ThresholdColor, calculateQuantileThresholds } from '@dkkoval/react-stats-map';

const ThresholdOptions = () => {
  const { data, thresholdColors, setThresholdColors } = useMapSettings();
  const dataValuesRef = useRef<string>('');

  // Calculate default thresholds based on current data
  // For N buckets, we need N-1 thresholds (boundaries between buckets)
  const calculateDefaultThresholds = useMemo(() => {
    const defaultColors = ['#34d399', '#10b981', '#059669', '#047857', '#065f46'];
    const dataValues = Object.values(data);

    // calculateQuantileThresholds returns thresholds that divide data into equal quantiles
    // For 5 buckets, it returns 4 thresholds (the boundaries)
    // scaleThreshold expects N thresholds for N+1 colors
    const quantileThresholds = calculateQuantileThresholds(dataValues, defaultColors.length);

    // Map thresholds to colors (each threshold marks the start of the next color)
    const allThresholds: ThresholdColor[] = quantileThresholds.map((threshold, i) => ({
      threshold,
      color: defaultColors[i + 1], // Color at index i+1 applies for values >= threshold
    }));

    return allThresholds;
  }, [data]);

  // Set initial thresholds
  useEffect(() => {
    if (!thresholdColors && setThresholdColors) {
      setThresholdColors(calculateDefaultThresholds);
    }
  }, [thresholdColors, setThresholdColors, calculateDefaultThresholds]);

  // Recalculate thresholds when data changes
  useEffect(() => {
    const currentDataValues = JSON.stringify(Object.values(data).sort());

    // Only recalculate if data values have actually changed and thresholds exist
    if (thresholdColors && dataValuesRef.current && currentDataValues !== dataValuesRef.current) {
      setThresholdColors?.(calculateDefaultThresholds);
    }

    dataValuesRef.current = currentDataValues;
  }, [data, thresholdColors, calculateDefaultThresholds, setThresholdColors]);

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
    // We want to add one more bucket
    // Current number of buckets = current thresholds + 1
    const currentBucketCount = (thresholdColors?.length || 4) + 1;
    const newBucketCount = currentBucketCount + 1;

    // Generate colors for buckets
    const defaultColors = ['#34d399', '#10b981', '#059669', '#047857', '#065f46'];
    const colors = [...defaultColors];

    for (let i = defaultColors.length; i < newBucketCount; i++) {
      const hue = (i * 137.5) % 360;
      colors.push(`hsl(${hue}, 60%, 50%)`);
    }

    const dataValues = Object.values(data);
    const quantileThresholds = calculateQuantileThresholds(dataValues, newBucketCount);

    // Map thresholds to colors (N thresholds for N+1 buckets)
    const newThresholds: ThresholdColor[] = quantileThresholds.map((threshold, i) => ({
      threshold,
      color: colors[i + 1], // Color at index i+1 applies for values >= threshold
    }));

    setThresholdColors?.(newThresholds);
  };

  const removeThreshold = (index: number) => {
    if (!thresholdColors || thresholdColors.length <= 1) return; // Keep at least 1 threshold (2 buckets)

    // When removing, we go down one bucket
    // Current number of buckets = current thresholds + 1
    const currentBucketCount = thresholdColors.length + 1;
    const newBucketCount = currentBucketCount - 1;

    // Generate colors for buckets
    const defaultColors = ['#34d399', '#10b981', '#059669', '#047857', '#065f46'];
    const colors = [...defaultColors];

    for (let i = defaultColors.length; i < newBucketCount; i++) {
      const hue = (i * 137.5) % 360;
      colors.push(`hsl(${hue}, 60%, 50%)`);
    }

    const dataValues = Object.values(data);
    const quantileThresholds = calculateQuantileThresholds(dataValues, newBucketCount);

    // Map thresholds to colors (N thresholds for N+1 buckets)
    const newThresholds: ThresholdColor[] = quantileThresholds.map((threshold, i) => ({
      threshold,
      color: colors[i + 1], // Color at index i+1 applies for values >= threshold
    }));

    setThresholdColors(newThresholds);
  };



  const resetToAuto = () => {
    setThresholdColors?.(calculateDefaultThresholds);
  };

  return (
    <div>
      <div className='flex items-center justify-between mb-3'>
        <p className='text-xs text-gray-500'>Auto-updates with data changes</p>
        <div className='flex items-center gap-1'>
          <button
            onClick={resetToAuto}
            className='flex items-center gap-1 py-1 px-2 bg-gray-600 text-white rounded text-xs font-medium hover:bg-gray-700'
            title='Recalculate thresholds based on current data'
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
          <button
            onClick={addThreshold}
            className='flex items-center gap-1 py-1 px-2 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700'
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add
          </button>
        </div>
      </div>

      <div className='flex flex-col gap-2 overflow-y-auto'>
        {thresholdColors?.map((thresholdColor: ThresholdColor, index: number) => (
          <div key={index} className='flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200'>
            <span className='text-xs font-medium text-gray-500 min-w-[20px]'>#{index + 1}</span>
            <div
              className='w-6 h-6 rounded border border-gray-300'
              style={{ backgroundColor: thresholdColor.color }}
            />

            <input
              type='number'
              value={thresholdColor.threshold}
              onChange={(e) => handleThresholdChange(index, Number(e.target.value))}
              className='border border-gray-300 px-2 py-1 rounded text-xs w-20 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none'
              placeholder="Value"
            />

            <input
              type='color'
              value={thresholdColor.color}
              onChange={(e) => handleColorChange(index, e.target.value)}
              className='w-10 h-6 rounded cursor-pointer border border-gray-300'
            />

            <span className='text-xs font-mono text-gray-500 flex-1'>{thresholdColor.color}</span>

            <button
              onClick={() => removeThreshold(index)}
              className='p-1 text-red-600 hover:bg-red-50 rounded'
              title="Remove"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {(!thresholdColors || thresholdColors.length === 0) && (
        <div className='text-center py-6 text-gray-400'>
          <p className='text-xs'>No thresholds defined</p>
        </div>
      )}
    </div>
  );
};

export default ThresholdOptions;
