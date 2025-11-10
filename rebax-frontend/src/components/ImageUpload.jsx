import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function ImageUpload({ initial = [], onChange }) {
  const [urls, setUrls] = useState(initial || [""]);

  useEffect(() => {
    onChange?.(urls.filter((u) => u.trim() !== ""));
  }, [urls]);

  const removeUrl = (index) => {
    const updated = urls.filter((_, i) => i !== index);
    setUrls(updated.length ? updated : [""]);
  };

  const addNewUrl = () => {
    setUrls([...urls, ""]);
  };

  const handleUrlChange = (index, value) => {
    const updated = [...urls];
    updated[index] = value;
    setUrls(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-700 dark:text-gray-300">
          Property Image URLs
        </h3>
        <button
          type="button"
          className="btn btn-xs btn-outline text-sm flex items-center gap-2"
          onClick={addNewUrl}
        >
          <FaPlus /> Add Image
        </button>
      </div>

      <div className="space-y-2">
        {urls.map((url, i) => (
          <div
            key={i}
            className="flex items-center gap-2 bg-gray-50 dark:bg-neutral-800 rounded-lg p-2 border"
          >
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={url}
              onChange={(e) => handleUrlChange(i, e.target.value)}
              className="input input-bordered w-full dark:bg-neutral-700"
            />
            <button
              type="button"
              className="btn btn-xs btn-error"
              onClick={() => removeUrl(i)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      {urls.filter((u) => u.trim() !== "").length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
          {urls
            .filter((u) => u.trim() !== "")
            .map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`preview-${i}`}
                className="h-32 w-full object-cover rounded-lg border shadow"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/150?text=Invalid+URL")
                }
              />
            ))}
        </div>
      )}
    </div>
  );
}
