import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { withClerkProvider } from "./withClerkProvider";
import FormBuilder from "./components/FormBuilderMain";
import FormFiller from "./components/FormFiller";
import ResponseViewer from "./components/ResponseViewer";
import MobileMessage from "./components/MobileMessage";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/.test(userAgent) || window.innerWidth < 1024;
      setIsMobile(isMobileDevice);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile) {
    return (
      <>
        <MobileMessage />
        <Analytics />
      </>
    );
  }


  const urlParams = new URLSearchParams(window.location.search);
  const formId = urlParams.get("form");
  const viewResponses = urlParams.get("responses");

  if (viewResponses === "true") {
    return (
      <>
        <ResponseViewer
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onBack={() => (window.location.href = "/")}
        />
        <Analytics />
      </>
    );
  }

  if (formId) {
    return (
      <>
        <FormFiller formId={formId} darkMode={darkMode} />
        <Analytics />
      </>
    );
  }

  return (
    <>
      <FormBuilder setAppDarkMode={setDarkMode}/>
      <Analytics />
    </>
  );
};

export default withClerkProvider(App);