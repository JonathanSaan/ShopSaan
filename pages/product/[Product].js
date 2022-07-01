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
      <div className={styles.ContainerProduct}>
        <div className={styles.DetailsProduct}>
          <h1>Product {id} </h1>
        </div>
      </div>
    </>
  );
};