import { useState } from "react";

import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

import { Header } from "../components/Header";
import ProductsList from "./api/ProductsList";
import styles from "../styles/Home.module.scss";





export async function getStaticProps() {
  const data = await fetch("http://localhost:3000/api/hello")
  
  const Products = await data.json()
  console.log(Products)
  
  return {
    props: { Products },
  }
}




export default function Home({ theme, toggleTheme, Products }) {
  
  return (
    <>
      <Head>
        <title>ShopSaan </title>
      </Head>
      <Header theme={theme} toggleTheme={toggleTheme}/>
      <div className={theme ? styles.ContainerDark : styles.ContainerWhite}>
        <div className={styles.ContainerProducts}>
          {Products.map((product) => (
            <Link href={`/product/${product.name.toLowerCase()}`}>
              <div className={styles.Product}>
                <img
                  className={styles.Image}
                  src={product.img}
                  alt={product.name}
                  width={100}
                  height={100}
                />
                <p className={styles.ProductName}>
                  {product.name}
                </p>
                <p className={styles.ProductPrice}>
                  {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};