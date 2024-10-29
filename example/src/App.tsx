import EditorComponent from './components/EditorComponent';
import { MapSettingsProvider } from './MapSettingsContext';
import MapContainer from './components/MapContainer';
import TabControls from './components/TabControls';

function App() {
  return (
    <MapSettingsProvider>
      <div className='flex h-screen p-6 box-border bg-gray-50'>
        <EditorComponent />
        <div className='w-3/4 flex flex-col items-center space-y-4'>
          <MapContainer />
          <TabControls />
        </div>
      </div>
    </MapSettingsProvider>
  );
}

export default App;
