import { useContext } from "react";

import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";

import { Header } from "../../components/Header";
import styles from "../../styles/Product.module.scss";


export default function Product({ theme, toggleTheme }) {
  
  const router = useRouter()
  const { id } = router.query
  
  //const theme = useContext(UserContext);
  
  return (
    <>
      <Head>
        <title>Product </title>
      </Head>
      <Header theme={theme} toggleTheme={toggleTheme}/>
      <div className={theme ? styles.ContainerProductDark : styles.ContainerProductWhite}>
        <div className={styles.DetailsProduct}>
          <h1>Product {theme} </h1>
        </div>
      </div>
    </>
  );
};