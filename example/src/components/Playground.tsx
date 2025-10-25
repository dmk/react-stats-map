import EditorComponent from '../components/EditorComponent';
import MapContainer from '../components/MapContainer';
import TabControls from '../components/TabControls';
import { useMapSettings } from '../MapSettingsContext';
import { Country, mapSettings } from '../App';

interface PlaygroundProps {
  country: Country;
  setCountry: React.Dispatch<React.SetStateAction<Country>>;
};

function Playground({ country, setCountry }: PlaygroundProps) {
  const { setData, setJsonData, setTitle, setValueName } = useMapSettings();

  const changeCountry = (c: Country) => {
    const data = mapSettings[c].providerProps.dataKeysTransformer(
      mapSettings[c].providerProps.initialData
    );

    setCountry(c);
    setData(data);
    setJsonData(JSON.stringify(mapSettings[c].providerProps.initialData, null, 2));
    setTitle(mapSettings[c].providerProps.initialTitle);
    setValueName(mapSettings[c].providerProps.initialValueName);
  };

  return (
    <div className='flex h-screen p-6 box-border bg-gray-50 gap-8'>
      <div className='w-1/4 flex flex-col items-center space-y-6'>
        <select
          value={country}
          onChange={(e) => {
            changeCountry(e.target.value as Country);
          }}
          className="block w-full shadow-md px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
        >
          <option value="Ukraine">Ukraine</option>
          <option value="Moldova">Moldova</option>
          <option value="Poland">Poland</option>
          <option value="Europe">Europe</option>
          <option value="France">France</option>
          <option value="Germany">Germany</option>
          <option value="World">World</option>
        </select>
        <div className="overflow-y-auto w-full p-0 rounded-md shadow-sm">
          <EditorComponent />
        </div>
      </div>

      <div className='w-3/4 flex flex-col items-center space-y-6'>
        <MapContainer mapComponent={mapSettings[country].mapComponent} />
        <TabControls />
      </div>
    </div>
  );
}

export default Playground;
