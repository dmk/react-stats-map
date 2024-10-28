import { ParentSize } from '@visx/responsive';
import './App.css';
import populationJson from './data/population.json';
import UAMap, { getOblastCode, OblastCode } from '@dkkoval/react-ua-map';

interface MapData {
  title: string;
  valueName: string;
  data: {
    [region: string]: number; // TODO: have type with defined regions
  };
}

function transformDataKeys(data: Record<string, number>): Record<OblastCode, number> {
  const transformedData: Partial<Record<OblastCode, number>> = {};

  Object.entries(data).forEach(([key, value]) => {
    const code = getOblastCode(key);
    if (code) {
      transformedData[code] = value;
    }
  });

  return transformedData as Record<OblastCode, number>;
}

function App() {
  const { data: rawData, title, valueName }: MapData = populationJson;

  const data = transformDataKeys(rawData);

  return (
    <div className='App' style={{
      width: '90vw',
      height: '90vh',
      border: '1px solid #eee',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '24px',
    }}>
      <ParentSize>
        {({ width, height }) => (
          <UAMap
            {...{ width, height }}
            title={title}
            valueName={valueName}
            data={data}
          />
        )}
      </ParentSize>
    </div>
  );
}

export default App;
