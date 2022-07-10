import { useState } from "react";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.scss";


function MyApp({ Component, pageProps: { session, ...pageProps }}) {
  
  let [theme, SetTheme] = useState(false);
  const toggleTheme = () => {
    SetTheme(!theme)
    if (theme === false) {
      return localStorage.setItem(theme, false);
    }
    //localStorage.setItem('theme', theme);
    return localStorage.setItem(theme, true);
  };
  
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} theme={theme} toggleTheme={toggleTheme}/>
    </SessionProvider>
  );
};

export default MyApp