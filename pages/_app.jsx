import { useState, useEffect } from "react";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(false);
  
  const toggleTheme = () => {
    setTheme(theme => {
      localStorage.setItem('theme', JSON.stringify(!theme));
      return !theme;
    });
  };
  
  useEffect(() => {
    const themeFromLocalStorage = JSON.parse(localStorage.getItem('theme'));
    setTheme(themeFromLocalStorage);
  }, []);
  
  return (
      <Component {...pageProps} theme={theme} toggleTheme={toggleTheme}/>
  );
};

export default MyApp