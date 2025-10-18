import React from 'react';
import { ParentSize } from '@visx/responsive';
import { useMapSettings } from '../MapSettingsContext';
import { MDMapProps } from '@dkkoval/react-md-stats-map';
import { UAMapProps } from '@dkkoval/react-ua-stats-map';
import { PLMapProps } from '@dkkoval/react-pl-stats-map';
import { EUMapProps } from '@dkkoval/react-eu-stats-map';
import { FRMapProps } from '@dkkoval/react-fr-stats-map';

interface MapContainerProps {
  mapComponent: React.FC<UAMapProps | MDMapProps | PLMapProps | EUMapProps | FRMapProps>;
}

const MapContainer = ({ mapComponent: MapComponent }: MapContainerProps) => {
  const {
    title,
    valueName,
    padding,
    hideTitle,
    hideLegend,
    borderColor,
    defaultFillColor,
    thresholdColors,
    data,
  } = useMapSettings();

  return (
    <div className='w-full h-4/5 border rounded-lg flex justify-center items-center bg-white shadow-md'>
      <ParentSize>
        {({ width, height }) => {
          // Don't render until we have valid dimensions
          if (width === 0 || height === 0) {
            return null;
          }
          
          return (
            <MapComponent
              {...{ width, height }}
              title={title}
              valueName={valueName}
              data={data}
              mapStyle={{
                padding,
                borderColor,
                defaultFillColor,
              }}
              hideTitle={hideTitle}
              hideLegend={hideLegend}
              thresholdColors={thresholdColors}
            />
          );
        }}
      </ParentSize>
    </div>
  );
};

export default MapContainer;
