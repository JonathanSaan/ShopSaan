import { useState, useEffect } from "react";

import { CartProvider } from "react-use-cart";
import { AuthProvider } from '../components/context/AuthContext';
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
    <CartProvider>
      <AuthProvider>
        <Component {...pageProps} theme={theme} toggleTheme={toggleTheme}/>
      </AuthProvider>
    </CartProvider>
  );
};

export default MyApp