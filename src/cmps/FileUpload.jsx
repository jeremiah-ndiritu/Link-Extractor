export default function FileUpload({ setUrls }) {
  function handleChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (fe) => {
      const parsed = JSON.parse(fe.target.result);

      if (
        !Array.isArray(parsed) ||
        !parsed.every((item) => item && typeof item.url === "string")
      ) {
        alert(
          "Invalid file format. Please upload a JSON array of job applications!"
        );
        return;
      }

      const urls = parsed
        .map((item) => item.url)
        .filter((url) => typeof url === "string");

      setUrls(urls);
    };

    reader.readAsText(file);
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
      <h2 className="text-lg font-semibold text-slate-200 mb-2">
        Upload JSON File
      </h2>

      <p className="text-sm text-slate-400 mb-4">
        Upload a JSON file containing an array of applications with a
        <span className="text-blue-400 font-medium"> url </span>
        property.
      </p>

      <label
        htmlFor="file"
        className="inline-flex items-center gap-3 cursor-pointer
                   bg-slate-800 hover:bg-slate-700
                   border border-slate-700
                   text-slate-200 px-4 py-2 rounded-lg
                   transition"
      >
        📂 Choose File
        <span className="text-xs text-slate-400">(JSON only)</span>
      </label>

      <input
        type="file"
        id="file"
        name="file"
        accept=".json"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
