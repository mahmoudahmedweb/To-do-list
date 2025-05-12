import React from "react";

interface ThemeToggleProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  darkMode,
  toggleDarkMode,
}) => {
  return (
    <i
      className={`theme-toggle ${
        darkMode ? "fa-solid fa-sun" : "fa-regular fa-moon"
      }`}
      onClick={toggleDarkMode}
    />
  );
};

export default ThemeToggle;
