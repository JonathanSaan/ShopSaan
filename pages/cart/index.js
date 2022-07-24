import Head from "next/head";
import { useEffect, useState } from "react";

import { Header } from "../../components/Header";
import styles from "../../styles/Cart.module.scss";

export default function Cart({ theme, toggleTheme }) {
  const [cart, setCart] = useState([]);
  
  return (
    <>
      <Head>
        <title>Cart </title>
      </Head>
      <Header theme={theme} toggleTheme={toggleTheme}/>
      <div className={ theme ? styles.DarkMode : styles.LightMode}>
        <div className={styles.Container}>
          <h1>Your Cart is Empty</h1>
        </div>
      </div>
    </>
  );
};