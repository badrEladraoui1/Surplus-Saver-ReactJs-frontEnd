import { useState, useEffect } from "react";

const ThemeToggler = () => {
  const storedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(storedTheme || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <input
      type="checkbox"
      className="toggle"
      checked={theme === "dark"}
      onChange={toggleTheme}
    />
  );
};

export default ThemeToggler;
