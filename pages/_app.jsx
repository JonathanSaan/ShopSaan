import { useState, useEffect } from "react";
import { CartProvider } from "react-use-cart";
import "../styles/globals.scss";
import { default as NextApp } from "next/app";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(false);
  const [showing, setShowing] = useState(false);

  const toggleTheme = () => {
    setTheme((theme) => {
      localStorage.setItem("theme", JSON.stringify(!theme));
      return !theme;
    });
  };

  useEffect(() => {
    const themeFromLocalStorage = JSON.parse(localStorage.getItem("theme"));
    setTheme(themeFromLocalStorage);
    setShowing(true);
  }, []);

  if (!showing) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  }

  return (
    <CartProvider>
      <Component {...pageProps} theme={theme} toggleTheme={toggleTheme} />
    </CartProvider>
  );
}

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    return <MyApp Component={Component} pageProps={pageProps} />;
  }
}
