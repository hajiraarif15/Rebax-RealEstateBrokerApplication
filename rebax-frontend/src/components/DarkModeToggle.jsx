import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem("rebax_theme") === "dark");

  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add("dark");
      localStorage.setItem("rebax_theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("rebax_theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(v => !v)}
      className="px-3 py-2 rounded-lg border hover:bg-gray-100 dark:hover:bg-white/10 transition"
      title="Toggle theme"
    >
      {dark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-indigo-400" />}
    </button>
  );
}
