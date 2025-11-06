export default function Input({ label, ...props }) {
  return (
    <label className="block mb-3">
      <span className="block text-sm text-gray-600 mb-1">{label}</span>
      <input
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
        {...props}
      />
    </label>
  );
}
