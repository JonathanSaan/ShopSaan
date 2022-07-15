import { useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.scss";


function MyApp({ Component, pageProps: { session, ...pageProps }}) {
  
  const [theme, setTheme] = useState(false)
  
  console.log('Theme estado', theme)
  
  const toggleTheme = () => {
    setTheme(theme => {
      localStorage.setItem('theme', JSON.stringify(!theme))
      return !theme
   })
 }
  
  useEffect(() => {
    const themeFromLocalStorage = JSON.parse(localStorage.getItem('theme'))
    setTheme(themeFromLocalStorage)
  }, [])
  
  
  
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} theme={theme} toggleTheme={toggleTheme}/>
    </SessionProvider>
  );
};

export default MyApp