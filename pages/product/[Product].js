import { useRouter } from "next/router";
import Image from "next/image";

import { Header } from "../../components/Header";
import styles from "../../styles/Product.module.scss";


export default function Product() {
  
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Header />
      <div className={styles.Product}>
        <h1>Product {id} </h1>
      </div>
    </>
  );
};