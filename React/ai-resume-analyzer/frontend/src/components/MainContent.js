import { useState } from "react";
import Panel1 from "./Panel1";
import Panel2 from "./Panel2";
import SubmitSection from "./SubmitSection";

const MainContent = () => {
  const [fileURL, setFileURL] = useState(null);

  const handleFileChange = (file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileURL(url);
    }
  };

  return (
    <main className="flex flex-col w-4/5 p-4 space-y-4 overflow-y-auto">

      {/* Panels */}
      <div className="flex space-x-4 flex-1 min-h-0">
        <Panel1 fileURL={fileURL} />
        <Panel2 />
      </div>

      {/* Upload + Submit */}
      <div className="flex space-x-4">
        <div className="w-1/2">
          <SubmitSection onFileChange={handleFileChange} />
        </div>
        <div className="w-1/2" />
      </div>

    </main>
  );
};

export default MainContent;
