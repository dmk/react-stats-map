import { MapSettingsProvider, } from './MapSettingsContext';
import { useState } from 'react';
import UAMap from '@dkkoval/react-ua-stats-map';
import MDMap from '@dkkoval/react-md-stats-map';
import PLMap from '@dkkoval/react-pl-stats-map';
import EUMap from '@dkkoval/react-eu-stats-map';

import uaPopulationJson from './data/ua/population.json';
import uaJsonEditorSchema from './data/ua/data-schema.json';

import mdPopulationJson from './data/md/population.json';
import mdJsonEditorSchema from './data/md/data-schema.json';

import plPopulationJson from './data/pl/population.json';
import plJsonEditorSchema from './data/pl/data-schema.json';

import euPopulationJson from './data/eu/population.json';
import euJsonEditorSchema from './data/eu/data-schema.json';

import { transformEUDataKeys, transformMDDataKeys, transformPLDataKeys, transformUADataKeys } from './utils/transformers';
import Playground from './components/Playground';

export type Country = 'Ukraine' | 'Moldova' | 'Poland' | 'Europe';

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
  },
  'Poland': {
    mapComponent: PLMap,
    providerProps: {
      initialTitle: plPopulationJson.title,
      initialValueName: plPopulationJson.valueName,
      initialData: plPopulationJson.data,
      jsonEditorSchema: plJsonEditorSchema,
      dataKeysTransformer: transformPLDataKeys,
    }
  },
  'Europe': {
    mapComponent: EUMap,
    providerProps: {
      initialTitle: euPopulationJson.title,
      initialValueName: euPopulationJson.valueName,
      initialData: euPopulationJson.data,
      jsonEditorSchema: euJsonEditorSchema,
      dataKeysTransformer: transformEUDataKeys,
    }
  },
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
