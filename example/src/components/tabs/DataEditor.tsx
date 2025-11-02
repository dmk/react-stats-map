import React, { useState, useMemo } from 'react';
import { useMapSettings } from '../../MapSettingsContext';

const DataEditor = () => {
  const { data, setData, valueName, jsonData, dataKeysTransformer } = useMapSettings();
  const [searchQuery, setSearchQuery] = useState('');

  // Create a stable mapping from code to name by parsing jsonData once
  // This mapping persists even when data values change
  const codeToNameMap = useMemo(() => {
    try {
      const originalData = JSON.parse(jsonData);
      const rawData = originalData.data || originalData;

      // Transform the original data keys to get code -> name mapping
      const mapping: Record<string, string> = {};

      // For each region name in original data, transform it to get its code
      Object.keys(rawData).forEach((regionName) => {
        // Create a temporary object with just this region to transform
        const tempData = { [regionName]: 1 };
        const transformed = dataKeysTransformer(tempData);

        // Get the code that this region name transformed to
        const code = Object.keys(transformed)[0];
        if (code) {
          mapping[code] = regionName;
        }
      });

      return mapping;
    } catch (error) {
      // If jsonData is invalid, just use codes as names
      console.error('Error parsing region names:', error);
      return {};
    }
  }, [jsonData, dataKeysTransformer]); // Only depends on jsonData and transformer - stable mapping

  // Convert data object to array of entries with names
  const dataEntries = useMemo(() => {
    return Object.entries(data)
      .map(([code, value]) => ({
        code,
        name: codeToNameMap[code] || code,
        value,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [data, codeToNameMap]);

  // Filter entries based on search query
  const filteredEntries = useMemo(() => {
    if (!searchQuery.trim()) return dataEntries;
    const query = searchQuery.toLowerCase();
    return dataEntries.filter((entry) =>
      entry.name.toLowerCase().includes(query) ||
      entry.code.toLowerCase().includes(query)
    );
  }, [dataEntries, searchQuery]);

  // Calculate stats
  const stats = useMemo(() => {
    const values = Object.values(data);
    return {
      total: values.length,
      sum: values.reduce((a, b) => a + b, 0),
      min: Math.min(...values),
      max: Math.max(...values),
      avg: values.reduce((a, b) => a + b, 0) / values.length,
    };
  }, [data]);

  const handleValueChange = (code: string, newValue: string) => {
    const numValue = parseFloat(newValue);
    if (!isNaN(numValue)) {
      const updatedData = {
        ...data,
        [code]: numValue,
      };
      setData(updatedData as typeof data);
    }
  };

  const handleBulkUpdate = (multiplier: number) => {
    const updatedData = Object.fromEntries(
      Object.entries(data).map(([code, value]) => [
        code,
        value * multiplier,
      ])
    );
    setData(updatedData as typeof data);
  };

  return (
    <div className='h-full flex flex-col overflow-hidden'>
      {/* Header */}
      <div className='px-4 py-2.5 bg-gray-50 border-b border-gray-200 flex-shrink-0'>
        <div className='flex items-center justify-between mb-2'>
          <span className='text-xs font-medium text-gray-700'>Region Data</span>
          <span className='text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded font-medium'>
            Live Preview
          </span>
        </div>
        {/* Search */}
        <div className='relative'>
          <input
            type='text'
            placeholder='Search regions...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none'
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
            >
              <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Stats Bar */}
      <div className='px-4 py-2 bg-blue-50 border-b border-gray-200 flex-shrink-0'>
        <div className='grid grid-cols-4 gap-2 text-xs'>
          <div className='text-center'>
            <div className='text-gray-600'>Regions</div>
            <div className='font-semibold text-gray-900'>{stats.total}</div>
          </div>
          <div className='text-center'>
            <div className='text-gray-600'>Max</div>
            <div className='font-semibold text-gray-900'>{stats.max.toFixed(2)}</div>
          </div>
          <div className='text-center'>
            <div className='text-gray-600'>Min</div>
            <div className='font-semibold text-gray-900'>{stats.min.toFixed(2)}</div>
          </div>
          <div className='text-center'>
            <div className='text-gray-600'>Avg</div>
            <div className='font-semibold text-gray-900'>{stats.avg.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Data List */}
      <div className='flex-1 overflow-y-auto'>
        {filteredEntries.length === 0 ? (
          <div className='p-8 text-center text-gray-400'>
            <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className='text-sm'>No regions found</p>
            <p className='text-xs mt-1'>Try adjusting your search</p>
          </div>
        ) : (
          <div className='divide-y divide-gray-100'>
            {filteredEntries.map((entry) => (
              <div
                key={entry.code}
                className='px-4 py-2.5 hover:bg-blue-50 transition-colors group'
              >
                <div className='flex items-center gap-3'>
                  <div className='flex-1 min-w-0'>
                    <div className='text-xs font-medium text-gray-900 truncate'>
                      {entry.name}
                    </div>
                    <div className='text-xs text-gray-500 truncate'>
                      ({entry.code})
                    </div>
                  </div>
                  <div className='flex items-center gap-2 flex-shrink-0'>
                    <input
                      type='number'
                      step='any'
                      value={entry.value}
                      onChange={(e) => handleValueChange(entry.code, e.target.value)}
                      className='w-28 px-2.5 py-1 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-right bg-white transition-all group-hover:border-blue-300'
                    />
                    {valueName && (
                      <span className='text-xs text-gray-500 w-10 text-right'>{valueName}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {searchQuery && (
        <div className='px-4 py-2 bg-gray-50 border-t border-gray-200 flex-shrink-0'>
          <p className='text-xs text-gray-500'>
            Showing {filteredEntries.length} of {dataEntries.length} regions
          </p>
        </div>
      )}
    </div>
  );
};

export default DataEditor;

