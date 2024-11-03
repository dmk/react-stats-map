import { MapSettingsProvider, } from './MapSettingsContext';
import { useState } from 'react';
import UAMap from '@dkkoval/react-ua-map';
import MDMap from '@dkkoval/react-md-map';

import uaPopulationJson from './data/ua/population.json';
import uaJsonEditorSchema from './data/ua/data-schema.json';

import mdPopulationJson from './data/md/population.json';
import mdJsonEditorSchema from './data/md/data-schema.json';
import { transformMDDataKeys, transformUADataKeys } from './utils/transformers';
import Playground from './components/Playground';

type Country = 'Ukraine' | 'Moldova';

export const mapSettings: Record<Country, any> = {
  'Ukraine': {
    mapComponent: UAMap,
    providerProps: {
      initialTitle: uaPopulationJson.title,
      initialValueName: uaPopulationJson.valueName,
      initialData: uaPopulationJson.data,
      jsonEditorSchema: uaJsonEditorSchema,
      dataKeysTransformer: transformUADataKeys,
    }
  },
  'Moldova': {
    mapComponent: MDMap,
    providerProps: {
      initialTitle: mdPopulationJson.title,
      initialValueName: mdPopulationJson.valueName,
      initialData: mdPopulationJson.data,
      jsonEditorSchema: mdJsonEditorSchema,
      dataKeysTransformer: transformMDDataKeys,
    }
  }
}

function App() {
  const [country, setCountry] = useState<Country>('Ukraine');

  return (
    <MapSettingsProvider {...mapSettings[country].providerProps}>
      <Playground {...{ country, setCountry }} />
    </MapSettingsProvider>
  );
}

export default App;
