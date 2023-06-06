import React, { createContext, useEffect, useState } from "react";
const defaultState = {
  dark: false,
  toggleDark: () => {},
};
const ThemeContext = createContext(defaultState);
const ThemeProvider = ({ children }: any) => {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const lsDark = localStorage.getItem("dark");
    if (lsDark !== null) {
      setDark(JSON.parse(lsDark));
    }
  }, []);

  const applyTheme = () => {
    const d = document.documentElement;
    const themes = ["light", "dark"];

    if (dark) {
      d.classList.remove(...themes);
      d.classList.add("light");
    } else {
      d.setAttribute("class", "dark");
    }
  };

  useEffect(() => {
    applyTheme();
  }, [dark]);

  const toggleDark = () => {
    const d = document.documentElement;
    const themes = ["light", "dark"];
    if (dark) {
      d.classList.remove(...themes);
      d.classList.add("light");
    } else {
      d.setAttribute("class", "dark");
    }
    localStorage.setItem("dark", JSON.stringify(!dark));
    setDark(!dark);
  };
  return (
    <ThemeContext.Provider
      value={{
        dark,
        toggleDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeContext;
export { ThemeProvider };
