export default function CopyAllButton({ textToCopy = "No text!" }) {
  const handleClick = async () => {
    if (!textToCopy) return alert("No text to copy");
    try {
      const text = await navigator.clipboard.writeText(textToCopy);
      alert("Text copied to clipboard");
      console.log("text copied :>> ", text);
    } catch (err) {
      alert("Failed to copy text");
      console.log("err copying :>> ", err);
    }
  };
  return (
    <button className="bg-green-400" onClick={handleClick}>
      Copy All
    </button>
  );
}
