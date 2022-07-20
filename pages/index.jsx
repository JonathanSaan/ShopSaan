import { useState, useEffect } from "react";

import axios from "axios";
import Head from "next/head";
import Link from "next/link";

import { Grid, CardMedia, Typography, ListItem } from "@mui/material";

import { Header } from "../components/Header";
import { data } from "../data/data";
import styles from "../styles/Home.module.scss";


export default function Home({ theme, toggleTheme }) {
  
  return (
    <>
      <Head>
        <title>ShopSaan </title>
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
                    {product.price}
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