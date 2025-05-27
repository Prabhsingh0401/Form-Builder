import { useState, useEffect } from 'react';
import { BarChart3, Download, ArrowLeft } from 'lucide-react';

const ResponseViewer = ({ darkMode, onBack }) => {
  const [responses, setResponses] = useState([]);
  const [form, setForm] = useState(null);
  const [forms, setForms] = useState({});
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [formResponses, setFormResponses] = useState({});

  useEffect(() => {
    // Load all forms and responses from localStorage
    const storedResponses = JSON.parse(localStorage.getItem('formResponses') || '{}');
    const formData = JSON.parse(localStorage.getItem('formBuilderForms') || '{}');
    const sharedForms = JSON.parse(localStorage.getItem('sharedForms') || '{}');
    
    // Combine both regular forms and shared forms
    const allForms = { ...formData, ...sharedForms };
    setForms(allForms);
    setFormResponses(storedResponses);
    
    // If there's a selected form, load its responses
    if (selectedFormId) {
      setResponses(storedResponses[selectedFormId] || []);
      setForm(allForms[selectedFormId]);
    }
  }, [selectedFormId]);

  const handleFormSelect = (formId) => {
    setSelectedFormId(formId);
  };

  const exportToCSV = () => {
    if (!responses.length || !form) return;

    const headers = form.fields.map(field => field.label);
    const csvContent = [
      ['Timestamp', ...headers].join(','),
      ...responses.map(response => [
        new Date(response.timestamp).toLocaleString(),
        ...form.fields.map(field => {
          const value = response.responses[field.id];
          if (Array.isArray(value)) {
            return `"${value.join(', ')}"`;
          }
          return `"${value || ''}"`;
        })
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${form.title}-responses.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // If no form is selected, show the form selection screen
  if (!selectedFormId) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-2xl font-bold ${
              darkMode ? 'text-cyan-400' : 'text-purple-600'
            }`}>
              Form Responses
            </h2>
            <p className={`mt-1 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Select a form to view responses
            </p>
          </div>
          
          {onBack && (
            <button
              onClick={onBack}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              <ArrowLeft size={16} />
              <span>Back to Builder</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(forms).map(([id, formData]) => {
            const responseCount = (formResponses[id] || []).length;
            
            return (
              <div
                key={id}
                onClick={() => handleFormSelect(id)}
                className={`p-6 rounded-xl border cursor-pointer transition-all ${
                  darkMode 
                    ? 'border-gray-700 hover:border-cyan-500 bg-gray-800 hover:bg-gray-700' 
                    : 'border-gray-200 hover:border-purple-500 bg-white hover:bg-gray-50'
                }`}
              >
                <h3 className="text-lg font-semibold mb-2">{formData.title}</h3>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {formData.fields?.length || 0} fields
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    responseCount > 0
                      ? darkMode 
                        ? 'bg-green-900 text-green-300' 
                        : 'bg-green-100 text-green-800'
                      : darkMode
                        ? 'bg-gray-700 text-gray-400'
                        : 'bg-gray-100 text-gray-600'
                  }`}>
                    {responseCount} {responseCount === 1 ? 'response' : 'responses'}
                  </span>
                </div>
              </div>
            );
          })}

          {Object.keys(forms).length === 0 && (
            <div className={`col-span-3 text-center py-12 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <BarChart3 size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">No forms found</p>
              <p>Create a form first to collect responses</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // If a form is selected, show its responses
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSelectedFormId(null)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              <ArrowLeft size={16} />
            </button>
            <h2 className={`text-2xl font-bold ${
              darkMode ? 'text-cyan-400' : 'text-purple-600'
            }`}>
              Form Responses
            </h2>
          </div>
          <p className={`mt-1 ml-11 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {form?.title} • {responses.length} responses
          </p>
        </div>
        
        {responses.length > 0 && (
          <button
            onClick={exportToCSV}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              darkMode 
                ? 'bg-green-700 hover:bg-green-600 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        )}
      </div>

      {responses.length === 0 ? (
        <div className={`text-center py-12 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <BarChart3 size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">No responses yet</p>
          <p>Share your form to start collecting responses</p>
        </div>
      ) : (
        <div className={`overflow-x-auto rounded-lg border ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <table className={`w-full ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <thead className={`${
              darkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <tr>
                <th className={`px-4 py-3 text-left text-sm font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Timestamp
                </th>
                {form?.fields?.map((field) => (
                  <th
                    key={field.id}
                    className={`px-4 py-3 text-left text-sm font-medium ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {field.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={`divide-y ${
              darkMode ? 'divide-gray-700' : 'divide-gray-200'
            }`}>
              {responses.map((response) => (
                <tr key={response.id}>
                  <td className={`px-4 py-3 text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {new Date(response.timestamp).toLocaleString()}
                  </td>
                  {form?.fields?.map((field) => (
                    <td
                      key={field.id}
                      className={`px-4 py-3 text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      {Array.isArray(response.responses[field.id])
                        ? response.responses[field.id].join(', ')
                        : response.responses[field.id] || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ResponseViewer;