import Head from "next/head";
import Image from "next/image";
import Link from "next/link";


import { Header } from "../components/Header";
import Products from "../mocks/Products";
import styles from "../styles/Home.module.scss";


export default function Home() {
  
  return (
    <>
      <Header/>
      <div className={styles.container}>
        
        <ul>
          {Products.map((product) => {
            <li key={product.id}>
                {product.name}
            </li>
          })}
        </ul>
      
        <Link href="/product">
          <a>Hi </a>
        </Link>
      </div>
    </>
  );
};