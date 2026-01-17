import { clearDB } from "../indexedDB.js";
import CopyAllButton from "./CopyAllButton.jsx";

export default function ClearDBButton() {
  return (
    <button
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
      onClick={async () => {
        if (!confirm("Are you sure you want to clear all stored URLs?")) return;
        await clearDB();

        window.location.reload();
      }}
    >
      🧹 Clear Database
    </button>
  );
}
