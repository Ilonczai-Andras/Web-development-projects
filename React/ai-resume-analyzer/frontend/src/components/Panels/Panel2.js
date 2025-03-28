import { useState } from "react";

const Panel2 = () => {
  const [jobDescription, setJobDescription] = useState("");

  return (
    <section className="w-1/2 border border-indigo-200 rounded-xl p-4 bg-white shadow flex flex-col space-y-2">
      <h2 className="font-semibold text-indigo-600 mb-2">Job Description</h2>

      <textarea
        className="flex-1 w-full border rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Paste the job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <div className="text-right text-sm text-gray-500">
        {jobDescription.length} characters
      </div>
    </section>
  );
};

export default Panel2;
