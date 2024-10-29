import React from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import populationSchema from '../data/data-schema.json';
import { transformDataKeys, useMapSettings } from '../MapSettingsContext';

const EditorComponent = () => {
  const monaco = useMonaco();
  const { jsonData, setJsonData, setData } = useMapSettings();

  React.useEffect(() => {
    if (monaco) {
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [
          {
            uri: "http://example.com/population.schema.json", // This can be any unique URI
            fileMatch: ["*"],
            schema: populationSchema,
          },
        ],
      });
    }
  }, [monaco]);

  const handleJsonChange = (newValue: string | undefined) => {
    setJsonData(newValue || '');
    try {
      const parsedData = transformDataKeys(JSON.parse(newValue || '{}'));
      setData(parsedData);
    } catch (error) {
      console.error("Invalid JSON format");
    }
  };

  return (
    <div className='w-1/4 mr-4 border rounded-lg flex flex-col justify-top items-center bg-white shadow-md'>
      <h3 className='text-lg font-semibold my-2'>Map Data (JSON)</h3>
      <Editor
        height="80vh"
        defaultLanguage="json"
        defaultValue={jsonData}
        onChange={handleJsonChange}
        options={{
          minimap: { enabled: false },
          lineNumbers: 'off',
          fontSize: 12,
          folding: false,
          overviewRulerBorder: false,
          scrollBeyondLastLine: false,
          renderLineHighlight: 'none',
          guides: {
            bracketPairs: false,
            highlightActiveIndentation: false,
            highlightActiveBracketPair: false,
            indentation: false
          },
          hideCursorInOverviewRuler: true,
        }}
        className='h-full'
      />
    </div>
  );
};

export default EditorComponent;
