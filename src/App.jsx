import { useState } from "react";
import FormBuilder from "./components/FormBuilderMain";
import FormFiller from "./components/FormFiller";
import ResponseViewer from "./components/ResponseViewer";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  const urlParams = new URLSearchParams(window.location.search);
  const formId = urlParams.get('form');
  const viewResponses = urlParams.get('responses');
  
  if (viewResponses === 'true') {
    return <ResponseViewer darkMode={darkMode} onBack={() => window.location.href = '/'} />;
  }
  
  if (formId) {
    return <FormFiller formId={formId} darkMode={darkMode} />;
  }
  
  return <FormBuilder />;
};

export default App;