import { useContext } from "react";

import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";

import { Header } from "../../components/Header";
import styles from "../../styles/Product.module.scss";


export default function Product({ theme, toggleTheme }) {
  
  const router = useRouter()
  const parameter = router.query.Product
  console.log(router)
  
  return (
    <>
      <Head>
        <title>Product - {parameter}</title>
      </Head>
      <Header theme={theme} toggleTheme={toggleTheme}/>
      <div className={theme ? styles.DarkMode : styles.LightMode}>
        <div className={styles.Container}>
          <h1>Product {parameter} </h1>
        </div>
      </div>
    </>
  );
};