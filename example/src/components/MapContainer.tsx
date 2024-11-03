import React from 'react';
import { ParentSize } from '@visx/responsive';
import { useMapSettings } from '../MapSettingsContext';
import { MDMapProps } from '@dkkoval/react-md-map';
import { UAMapProps } from '@dkkoval/react-ua-map';

interface MapContainerProps {
  mapComponent: React.FC<UAMapProps | MDMapProps>;
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
        {({ width, height }) => (
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
        )}
      </ParentSize>
    </div>
  );
};

export default MapContainer;
