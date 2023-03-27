import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { CardMedia, Typography } from "@mui/material";
import { useCart } from "react-use-cart";

import { data } from "../../data/data";
import NotFound from "../404";
import Header from "../../components/Header";
import SelectType from "../../components/SelectType";
import styles from "../../styles/Product.module.scss";

export default function Details({ theme, toggleTheme }) {
  const router = useRouter();
  const { slug } = router.query;
  const product = data.find((a) => a.slug === slug);

  const [typeChosen, setTypeChosen] = useState(product.types?.[0]);

  const { addItem } = useCart();
  
  if (!product) {
    return <NotFound />
  };
  
  const handleProduct = () => {
    if (typeChosen) {
      return addItem(typeChosen);
    };

    return addItem(product);
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
            ${typeChosen?.price ? typeChosen?.price : product.price}
          </Typography>
          <SelectType product={product} typeChosen={typeChosen} setTypeChosen={setTypeChosen} />
          
          <button onClick={handleProduct} className={styles.productButton}>
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
};