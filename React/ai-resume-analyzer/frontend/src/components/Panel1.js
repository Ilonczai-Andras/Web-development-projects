const Panel1 = ({ fileURL }) => {
  return (
    <section className="w-1/2 border border-indigo-200 rounded-xl p-4 bg-white shadow flex flex-col space-y-2">
      <h2 className="font-semibold text-indigo-600 mb-2">CV</h2>

      {fileURL ? (
        <iframe src={fileURL} className="w-full h-full flex-1 rounded" title="PDF Viewer"></iframe>
      ) : (
        <div className="flex-1 bg-gray-100 rounded flex items-center justify-center text-gray-400">
          No PDF selected
        </div>
      )}
    </section>
  );
};

export default Panel1;
