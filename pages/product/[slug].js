import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { CardMedia, Typography } from "@mui/material";
import { useCart } from "react-use-cart";

import { data } from "../../data/data";
import NotFound from "../404";
import { Header } from "../../components/Header";
import SelectType from "../../components/SelectType";
import styles from "../../styles/Product.module.scss";

export default function Details({ theme, toggleTheme }) {
  const router = useRouter();
  const { slug } = router.query;
  const product = data.find((a) => a.slug === slug);

  const [typeBlood, setTypeBlood] = useState();

  const { addItem } = useCart();
  
  if (!product) {
    return <NotFound />
  };
  
  const handleProduct = () => {
    if (typeBlood) {
      addItem(product, typeBlood);
    };
    console.log(product);
    addItem(product);
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
      <div className={theme ? styles.darkMode : styles.lightMode}>
        <div className={styles.product}>
          <CardMedia
            component="img"
            image={product.img}
            title={product.name}
            className={styles.productImage}
            loading="lazy"
          ></CardMedia>
          <Typography className={styles.productName}>
            {product.name}
          </Typography>
          <Typography className={styles.productPrice}>
            ${product.price} 
          </Typography>
          
          <button onClick={handleProduct} className={styles.productButton}>
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
};
          //<SelectType product={product} typeBlood={typeBlood} setTypeBlood={setTypeBlood} />