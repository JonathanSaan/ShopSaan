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
        <meta name="description" content="A ecommerce made with next js" />
        <meta charset="UTF-8" />
        <meta name="keywords" content="store, ecommerce, shopping, organs, organ" />
        <meta name="author" content="JonathanSaan" />
      </Head>
      <Header theme={theme} toggleTheme={toggleTheme}/>
      <div className={theme ? styles.darkMode : styles.lightMode}>
        <div className={styles.container}>
          {data.map((product) => (
            <>
            <Link key={product.id} href={`product/${product.slug}`}>
              <Grid item md="4" className={styles.container_item}>
                <CardMedia
                  component="img"
                  image={product.img}
                  title={product.name}
                  className={styles.container_itemImage}
                  loading="lazy"
                ></CardMedia>
                <ListItem className={styles.container_item_details}>
                  <Typography className={styles.container_item_detailsTitle}>
                    {product.name}
                  </Typography>
                  <Typography className={styles.container_item_detailsPrice}>
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