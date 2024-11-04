import React, { createContext, useContext, useState, ReactNode } from 'react';
import { OblastCode } from '@dkkoval/react-ua-stats-map';
import { ThresholdColor } from '@dkkoval/react-stats-map';
import { RaionCode } from '@dkkoval/react-md-stats-map';

type RegionCode = OblastCode | RaionCode;

export interface MapSettings {
  title: string;
  valueName: string;
  padding: number;
  hideTitle: boolean;
  hideLegend: boolean;
  borderColor: string;
  defaultFillColor: string;
  data: Record<RegionCode, number>;
  jsonData: string;
  thresholdColors?: ThresholdColor[];
  jsonEditorSchema: any;
  dataKeysTransformer: (data: Record<string, number>) => Record<string, number>;
  setTitle: (title: string) => void;
  setValueName: (valueName: string) => void;
  setPadding: (padding: number) => void;
  setHideTitle: (hideTitle: boolean) => void;
  setHideLegend: (hideLegend: boolean) => void;
  setBorderColor: (color: string) => void;
  setDefaultFillColor: (color: string) => void;
  setData: (data: Record<RegionCode, number>) => void;
  setJsonData: (jsonData: string) => void;
  setThresholdColors?: (thresholdColors: ThresholdColor[]) => void;
}

export interface MapSettingsProviderProps {
  children: ReactNode;
  initialTitle: string;
  initialValueName: string;
  initialData: any;
  jsonEditorSchema: any;
  dataKeysTransformer: (data: Record<string, number>) => Record<RegionCode, number>;
}

const MapSettingsContext = createContext<MapSettings | undefined>(undefined);

export const useMapSettings = () => {
  const context = useContext(MapSettingsContext);
  if (!context) {
    throw new Error("useMapSettings must be used within a MapSettingsProvider");
  }
  return context;
};

export const MapSettingsProvider = ({
  children,
  initialData,
  initialTitle,
  initialValueName,
  jsonEditorSchema,
  dataKeysTransformer,
}: MapSettingsProviderProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [valueName, setValueName] = useState(initialValueName);
  const [padding, setPadding] = useState(10);
  const [hideTitle, setHideTitle] = useState(false);
  const [hideLegend, setHideLegend] = useState(false);
  const [borderColor, setBorderColor] = useState('#EBF4F3');
  const [defaultFillColor, setDefaultFillColor] = useState('#cbd5e1');
  const [data, setData] = useState(dataKeysTransformer(initialData));
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
        jsonEditorSchema,
        dataKeysTransformer,
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
