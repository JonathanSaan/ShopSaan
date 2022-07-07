import { useState, createContext } from "react";

import '../styles/globals.scss'


function MyApp({ Component, pageProps }) {
  
  const UserContext = createContext()

  let [theme, SetTheme] = useState(false);
  const toggleTheme = () => {
    SetTheme(!theme)
  };
  
  return (
    <UserContext.Provider value={{theme, toggleTheme}}>
      <Component {...pageProps} theme={theme} toggleTheme={toggleTheme}/>
    </UserContext.Provider>
  )
}

export default MyApp
