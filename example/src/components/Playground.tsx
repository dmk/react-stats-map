import { useState } from 'react';
import MapContainer from '../components/MapContainer';
import TabControls from '../components/TabControls';
import { useMapSettings } from '../MapSettingsContext';
import { Country, mapSettings } from '../App';

interface PlaygroundProps {
  country: Country;
  setCountry: React.Dispatch<React.SetStateAction<Country>>;
};

function Playground({ country, setCountry }: PlaygroundProps) {
  const { setData, setJsonData, setTitle, setValueName, setThresholdColors } = useMapSettings();
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const changeCountry = (c: Country) => {
    const data = mapSettings[c].providerProps.dataKeysTransformer(
      mapSettings[c].providerProps.initialData
    );

    setCountry(c);
    setData(data);
    setJsonData(JSON.stringify(mapSettings[c].providerProps.initialData, null, 2));
    setTitle(mapSettings[c].providerProps.initialTitle);
    setValueName(mapSettings[c].providerProps.initialValueName);
    // Reset thresholds when changing country so they recalculate based on new data
    setThresholdColors?.(undefined);
  };

  return (
    <div className='flex flex-col h-screen bg-gray-50 relative'>
      {/* Header */}
      <header className='bg-white border-b border-gray-200 z-10'>
        <div className='px-4 py-3 flex items-center justify-between'>
          <h1 className='text-lg font-semibold text-gray-900'>Stats Map Playground</h1>
          <div className='flex items-center gap-2'>
            <label className='text-sm font-medium text-gray-600'>Region:</label>
            <select
              value={country}
              onChange={(e) => {
                changeCountry(e.target.value as Country);
              }}
              className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Ukraine">🇺🇦 Ukraine</option>
              <option value="Moldova">🇲🇩 Moldova</option>
              <option value="Poland">🇵🇱 Poland</option>
              <option value="Europe">🇪🇺 Europe</option>
              <option value="France">🇫🇷 France</option>
              <option value="Germany">🇩🇪 Germany</option>
              <option value="Belgium">🇧🇪 Belgium</option>
              <option value="Netherlands">🇳🇱 Netherlands</option>
              <option value="World">🌍 World</option>
              <option value="United States">🇺🇸 United States</option>
            </select>
          </div>
        </div>
      </header>

      {/* Map and Panel Container */}
      <div className='flex flex-1 min-h-0 gap-4 p-4 transition-all duration-300'>
        {/* Map - Resizes based on panel state */}
        <div className='flex-1 min-w-0 relative'>
          <MapContainer mapComponent={mapSettings[country].mapComponent} />

          {/* Toggle Button */}
          <button
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className='absolute top-4 right-4 z-10 bg-white border border-gray-300 rounded-lg shadow-lg p-2 hover:bg-gray-50 transition-colors'
            aria-label={isPanelOpen ? 'Hide panel' : 'Show panel'}
          >
            <svg
              className={`w-5 h-5 text-gray-700 transition-transform duration-300 ${isPanelOpen ? '' : 'rotate-180'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Side Panel - Slides in/out */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isPanelOpen ? 'w-96' : 'w-0'
          }`}
        >
          <div className='w-96 h-full'>
            <TabControls />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playground;
