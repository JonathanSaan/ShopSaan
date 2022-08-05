import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

import axios from "axios";
import { Grid, CardMedia, Typography, ListItem } from "@mui/material";

import { Header } from "../components/Header";
import { data } from "../data/data";
import styles from "../styles/Home.module.scss";


export default function Home({ theme, toggleTheme }) {
  
  return (
    <>
      <Head>
        <title>ShopSaan </title>
        <meta name="description" content="A ecommerce made with next js" />
        <meta charset="UTF-8" />
        <meta name="keywords" content="store, ecommerce, shopping, organs, organ" />
        <meta name="author" content="JonathanSaan" />
      </Head>
      <Header theme={theme} toggleTheme={toggleTheme}/>
      <div className={theme ? styles.DarkMode : styles.LightMode}>
        <div className={styles.Container}>
          {data.map((product) => (
            <>
            <Link key={product.id} href={`product/${product.slug}`}>
              <Grid item md="4" className={styles.Product}>
                <CardMedia
                  component="img"
                  image={product.img}
                  title={product.name}
                  className={styles.image}
                  loading="lazy"
                ></CardMedia>
                <ListItem className={styles.ListItem}>
                  <Typography className={styles.ProductName}>
                    {product.name}
                  </Typography>
                  <Typography className={styles.ProductPrice}>
                    ${product.price}
                  </Typography>
                </ListItem>
              </Grid>
            </Link>
            </>
          ))}
        </div>
      </div>
    </>
  );
};