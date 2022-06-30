//import Head from "next/head";
import Image from "next/image";
import Link from "next/link";


import { Header } from "../components/Header";
import Products from "../components/Products";
//import Products from "../mocks/Products";
import styles from "../styles/Home.module.scss";


export default function Home() {
  
  return (
    <>
      <Header/>
      <div className={styles.container}>
        <div className={styles.ContainerProducts}>
          {Products.map((product) => (
            <Link href={`/product/${product.id}`}>
              <div className={styles.Product}>
                <img
                  className={styles.Image}
                  src={product.img}
                  alt={product.name}
                  width={100}
                  height={100}
                />
                <p>{product.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};