import { MapSettingsProvider, } from './MapSettingsContext';
import { useState } from 'react';
import UAMap from '@dkkoval/react-ua-stats-map';
import MDMap from '@dkkoval/react-md-stats-map';
import PLMap from '@dkkoval/react-pl-stats-map';
import EUMap from '@dkkoval/react-eu-stats-map';
import FRMap from '@dkkoval/react-fr-stats-map';
import WorldMap from '@dkkoval/react-world-stats-map';

import uaPopulationJson from './data/ua/population.json';
import uaJsonEditorSchema from './data/ua/data-schema.json';

import mdPopulationJson from './data/md/population.json';
import mdJsonEditorSchema from './data/md/data-schema.json';

import plPopulationJson from './data/pl/population.json';
import plJsonEditorSchema from './data/pl/data-schema.json';

import euPopulationJson from './data/eu/population.json';
import euJsonEditorSchema from './data/eu/data-schema.json';

import frPopulationJson from './data/fr/population.json';
import frJsonEditorSchema from './data/fr/data-schema.json';

import worldPopulationJson from './data/world/population.json';
import worldJsonEditorSchema from './data/world/data-schema.json';

import { transformEUDataKeys, transformFRDataKeys, transformMDDataKeys, transformPLDataKeys, transformUADataKeys, transformWorldDataKeys } from './utils/transformers';
import Playground from './components/Playground';

export type Country = 'Ukraine' | 'Moldova' | 'Poland' | 'Europe' | 'France' | 'World';

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
  'France': {
    mapComponent: FRMap,
    providerProps: {
      initialTitle: frPopulationJson.title,
      initialValueName: frPopulationJson.valueName,
      initialData: frPopulationJson.data,
      jsonEditorSchema: frJsonEditorSchema,
      dataKeysTransformer: transformFRDataKeys,
    }
  },
  'World': {
    mapComponent: WorldMap,
    providerProps: {
      initialTitle: worldPopulationJson.title,
      initialValueName: worldPopulationJson.valueName,
      initialData: worldPopulationJson.data,
      jsonEditorSchema: worldJsonEditorSchema,
      dataKeysTransformer: transformWorldDataKeys,
    }
  },
}

function App() {
  const [country, setCountry] = useState<Country>('Ukraine');

  return (
    <>
      <div className="hidden md:block">
        <MapSettingsProvider {...mapSettings[country].providerProps}>
          <Playground {...{ country, setCountry }} />
        </MapSettingsProvider>
      </div>
      <div className="block md:hidden text-center p-4">
        <p className="text-lg font-semibold">
          For the best experience, please view this application on a larger screen.
        </p>
        <p className="text-sm text-gray-600 mt-2">
          This feature is optimized for larger displays and may not be fully accessible on smaller screens.
        </p>
      </div>
    </>
  );
}

export default App;
