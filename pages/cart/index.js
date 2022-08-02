import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useCart } from "react-use-cart";
import { CardMedia } from "@mui/material";

import { Header } from "../../components/Header";
import styles from "../../styles/Cart.module.scss";

export default function Cart({ theme, toggleTheme }) {
  
  const {
    isEmpty,
    totalUniqueItems,
    cartTotal,
    items,
    updateItemQuantity,
    removeItem,
  } = useCart();
  
  if (isEmpty) return (
    <>
      <Head>
        <title>Cart </title>
      </Head>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className={ theme ? styles.DarkMode: styles.LightMode}>
        <div className={styles.Container}>
          <h1 className={styles.Title}>Your Cart is Empty</h1>
        </div>
      </div>
    < />
  );

  return (
    <>
      <Head>
        <title>Cart </title>
      </Head>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className={ theme ? styles.DarkMode: styles.LightMode}>
        <div className={styles.Container}>
          <h1 className={styles.Title}>Cart ({totalUniqueItems})</h1>
          <div className={styles.ListProducts}>
            {items.map((item) => (
              <>
                <li className={styles.Product} key={item.id}>
                  <CardMedia
                    component="img"
                    image={item.img}
                    title={item.name}
                    className={styles.Image}
                    loading="lazy"
                  ></CardMedia>
                  <div className={styles.Details}>
                    <Link key={item.id} href={`product/${item.slug}`}>
                      <a className={styles.Name}>
                        {item.name}
                      </a>
                    </Link>
                    <p onClick={() => removeItem(item.id)} className={styles.Remove}>
                      remove
                    </p>
                </div>
                <div className={styles.Right}>
                  <p className={styles.Price}>
                    ${item.price}
                  </p>
                  <button className={styles.UpdateItemQuantity} onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                    >
                      -
                  </button>
                  <button className={styles.Quantity}>
                    <p>
                      {item.quantity}
                    </p>
                    </button>
                    <button className={styles.UpdateItemQuantity} onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </li>
              < />
            ))}
          </div>
          <p className={styles.Total}>
            Total:
            <span>
              {cartTotal}
            </span>
          </p>
          <button className={styles.Checkout}>
            checkout
          </button>
        </div>
      </div>
    < />
  );
};