import { useRouter } from "next/router";
import Head from "next/head";

import { CardMedia, Typography } from "@mui/material";
import { useCart } from "react-use-cart";

import { data } from "../../data/data";
import NotFound from "../404";
import { Header } from "../../components/Header";
import styles from "../../styles/Product.module.scss";

export default function Details({ theme, toggleTheme }) {
  
  const router = useRouter();
  const { slug } = router.query;
  const product = data.find((a) => a.slug === slug);
  
  const { addItem } = useCart();
  
  if (!product) {
    return <NotFound />
  };
  
  return (
    <>
      <Head>
        <title>Product - {product.name}</title>
        <meta name="description" content="product" />
        <meta charset="UTF-8" />
        <meta name="keywords" content="store, ecommerce, product, organ" />
        <meta name="author" content="JonathanSaan" />
      </Head>
      <Header theme={theme} toggleTheme={toggleTheme}/>
      <div className={theme ? styles.DarkMode : styles.LightMode}>
        <div className={styles.Container}>
          <CardMedia
            component="img"
            image={product.img}
            title={product.name}
            className={styles.Image}
            loading="lazy"
          ></CardMedia>
          <Typography className={styles.ProductName}>
            {product.name}
          </Typography>
          <Typography className={styles.ProductPrice}>
            ${product.price} 
          </Typography>
          <button onClick={() => addItem(product)}>
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
};