import React, { createContext, useContext, useState, ReactNode } from 'react';
import populationJson from './data/population.json';
import { OblastCode, getOblastCode, ThresholdColor } from '@dkkoval/react-ua-map';

export interface MapSettings {
  title: string;
  valueName: string;
  padding: number;
  hideTitle: boolean;
  hideLegend: boolean;
  borderColor: string;
  defaultFillColor: string;
  data: Record<OblastCode, number>;
  jsonData: string;
  thresholdColors?: ThresholdColor[];
  setTitle: (title: string) => void;
  setValueName: (valueName: string) => void;
  setPadding: (padding: number) => void;
  setHideTitle: (hideTitle: boolean) => void;
  setHideLegend: (hideLegend: boolean) => void;
  setBorderColor: (color: string) => void;
  setDefaultFillColor: (color: string) => void;
  setData: (data: Record<OblastCode, number>) => void;
  setJsonData: (jsonData: string) => void;
  setThresholdColors?: (thresholdColors: ThresholdColor[]) => void;
}

const MapSettingsContext = createContext<MapSettings | undefined>(undefined);

export const useMapSettings = () => {
  const context = useContext(MapSettingsContext);
  if (!context) {
    throw new Error("useMapSettings must be used within a MapSettingsProvider");
  }
  return context;
};

export function transformDataKeys(data: Record<string, number>): Record<OblastCode, number> {
  const transformedData: Partial<Record<OblastCode, number>> = {};

  Object.entries(data).forEach(([key, value]) => {
    const code = getOblastCode(key);
    if (code) {
      transformedData[code] = value;
    }
  });

  return transformedData as Record<OblastCode, number>;
}

export const MapSettingsProvider = ({ children }: { children: ReactNode }) => {
  const initialData = populationJson.data;
  const [title, setTitle] = useState("Населення України, 2022.02, млн. осіб");
  const [valueName, setValueName] = useState("млн. осіб");
  const [padding, setPadding] = useState(10);
  const [hideTitle, setHideTitle] = useState(false);
  const [hideLegend, setHideLegend] = useState(false);
  const [borderColor, setBorderColor] = useState('#EBF4F3');
  const [defaultFillColor, setDefaultFillColor] = useState('#cbd5e1');
  const [data, setData] = useState(transformDataKeys(initialData));
  const [jsonData, setJsonData] = useState(JSON.stringify(initialData, null, 2));
  const [thresholdColors, setThresholdColors] = useState<ThresholdColor[] | undefined>(undefined);

  return (
    <MapSettingsContext.Provider
      value={{
        title,
        valueName,
        padding,
        hideTitle,
        hideLegend,
        borderColor,
        defaultFillColor,
        data,
        jsonData,
        thresholdColors,
        setTitle,
        setValueName,
        setPadding,
        setHideTitle,
        setHideLegend,
        setBorderColor,
        setDefaultFillColor,
        setData,
        setJsonData,
        setThresholdColors,
      }}
    >
      {children}
    </MapSettingsContext.Provider>
  );
};
