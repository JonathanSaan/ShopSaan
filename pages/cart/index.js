import Head from "next/head";

import { Header } from "../../components/Header";
import styles from "../../styles/Cart.module.scss";

export default function Cart({ theme, toggleTheme }) {
  
  return (
    <>
      <Head>
        <title>Cart </title>
      </Head>
      <Header theme={theme} toggleTheme={toggleTheme}/>
      <div className={ theme ? styles.DarkMode : styles.LightMode}>
        <div className={styles.Container}>
          <h1>Cart </h1>
        </div>
      </div>
    </>
  );
};