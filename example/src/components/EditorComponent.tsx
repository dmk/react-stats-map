import React from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { useMapSettings } from '../MapSettingsContext';

const EditorComponent = () => {
  const monaco = useMonaco();
  const { jsonData, setJsonData, setData, jsonEditorSchema, dataKeysTransformer } = useMapSettings();

  React.useEffect(() => {
    if (monaco) {
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [
          {
            uri: "http://example.com/population.schema.json",
            fileMatch: ["*"],
            schema: jsonEditorSchema,
          },
        ],
      });
    }
  }, [monaco, jsonEditorSchema]);

  const handleJsonChange = (newValue: string | undefined) => {
    setJsonData(newValue || '');
    try {
      const parsedData = dataKeysTransformer(JSON.parse(newValue || '{}'));
      setData(parsedData);
    } catch (error) {
      console.error("Invalid JSON format");
    }
  };

  return (
    <div className='h-full flex flex-col overflow-hidden'>
      <div className='px-4 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between flex-shrink-0'>
        <span className='text-xs text-gray-500'>JSON Editor</span>
        <span className='text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded font-medium'>
          Live Preview
        </span>
      </div>
      <div className='flex-1 overflow-hidden'>
        <Editor
          height="100%"
          defaultLanguage="json"
          onChange={handleJsonChange}
          value={jsonData}
          theme="vs-light"
          options={{
            minimap: { enabled: false },
            lineNumbers: 'on',
            fontSize: 12,
            folding: true,
            overviewRulerBorder: false,
            scrollBeyondLastLine: false,
            renderLineHighlight: 'all',
            guides: {
              bracketPairs: true,
              highlightActiveIndentation: true,
              highlightActiveBracketPair: true,
              indentation: true
            },
            hideCursorInOverviewRuler: true,
            lineNumbersMinChars: 3,
            padding: { top: 12, bottom: 12 },
            smoothScrolling: true,
          }}
          className='h-full'
        />
      </div>
    </div>
  );
};

export default EditorComponent;
