import Head from "next/head";

import { Header } from "../components/Header";
import styles from "../styles/Home.module.scss";

export default function NotFound({ theme, toggleTheme }) {
  return (
    <>
      <Head>
        <title>Product Not Found</title>
      </Head>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className={theme ? styles.DarkMode : styles.LightMode}>
        <div className={styles.Container}>
          <h1>Product Not Found</h1>
        </div>
      </div>
    </>
  );
}
