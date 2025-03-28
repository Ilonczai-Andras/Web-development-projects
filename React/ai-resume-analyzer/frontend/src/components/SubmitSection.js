const SubmitSection = ({ onFileChange }) => {

    const handleChange = (e) => {
      const file = e.target.files[0];
      if (file && (file.type === "application/pdf")) {
        onFileChange(file);
      }
    };
  
    return (
      <div className="border border-indigo-200 rounded-xl p-4 bg-white shadow flex flex-col space-y-4">
        <label className="text-sm font-medium text-gray-700">Upload Resume (PDF only)</label>
        
        <input 
          type="file"
          accept=".pdf"
          onChange={handleChange}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-500 file:text-white hover:file:bg-emerald-600 cursor-pointer"
        />
  
        <button className="bg-emerald-500 text-white py-2 px-6 rounded-full hover:bg-emerald-600 transition shadow-md self-start">
          Submit
        </button>
      </div>
    );
  };
  
  export default SubmitSection;
  