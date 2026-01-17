import FileUpload from "./cmps/FileUpload.jsx";
import { useState, useEffect } from "react";
import { saveUrls, loadUrls, saveClicked, loadClicked } from "./indexedDB.js";
import "./App.css";
import CopyAllButton from "./cmps/CopyAllButton.jsx";
import ClearDBButton from "./cmps/ClearDBButton.jsx";
export default function App() {
  const [urls, setUrls] = useState([]);
  const [clicked, setClicked] = useState([]);

  /**
   * @param {Event} e
   */
  const handleUrlClick = (e) => {
    let url = String(e.currentTarget.href);
    console.log(url);
    if (url.endsWith("/")) url = url.slice(0, -1);
    if (clicked.includes(url)) return;
    setClicked((prev) => [...prev, url]);
  };

  const stats = () => ({
    progress: urls.length ? `${clicked.length} / ${urls.length}` : "No URLs",
    percentage: (clicked.length / urls.length) * 100 || 0,
  });
  console.log("Clicked[]: ", clicked);
  // Load persisted data on first render
  useEffect(() => {
    (async () => {
      const storedUrls = await loadUrls();
      const storedClicked = await loadClicked();
      setUrls(storedUrls);
      setClicked(storedClicked);
    })();
  }, []);
  // Persist URLs when they change
  useEffect(() => {
    if (urls.length) {
      saveUrls(urls);
    }
  }, [urls]);

  // Persist clicked URLs
  useEffect(() => {
    if (clicked.length) {
      saveClicked(clicked);
    }
  }, [clicked]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-blue-400 mb-6">
        🔗 Link Extractor
      </h1>

      {/* Upload */}
      <div className="mb-8">
        <FileUpload setUrls={setUrls} />
      </div>

      {/* Content */}
      <section className="bg-slate-900 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-200">
            Extracted URLs
            <span className="text-blue-400 ml-2">({urls.length})</span>
          </h2>

          <div className="text-sm text-slate-400">
            <strong className="text-slate-300">Progress:</strong>{" "}
            {stats().progress} ({stats().percentage.toFixed(2)}%)
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className="bg-blue-500 h-2 transition-all duration-300"
            style={{ width: `${stats().percentage}%` }}
          />
        </div>
        {urls?.length && (
          <section className="flex justify-around items-center w-full">
            <ClearDBButton />
            <CopyAllButton textToCopy={urls.join("\n")} />
          </section>
        )}

        {/* URL List */}
        <ol className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 url-scroll">
          {urls.map((url, idx) => {
            const isClicked = clicked.includes(url);

            return (
              <li
                key={idx}
                className={`p-3 rounded-lg border transition ${
                  isClicked
                    ? "bg-green-900/30 border-green-700"
                    : "bg-slate-800 border-slate-700 hover:border-blue-500"
                }`}
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleUrlClick}
                  className={`break-all text-sm ${
                    isClicked
                      ? "text-green-400 line-through"
                      : "text-blue-400 hover:underline"
                  }`}
                >
                  {url}
                </a>
              </li>
            );
          })}
        </ol>
      </section>
    </main>
  );
}
