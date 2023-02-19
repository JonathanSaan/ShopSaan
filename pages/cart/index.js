import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import Modal from "react-modal";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useCart } from "react-use-cart";
import { CardMedia } from "@mui/material";

import { Header } from "../../components/Header";
import styles from "../../styles/Cart.module.scss";

const ThemeDarkModal = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    backgroundColor: "#2A2D34",
    color: "#FFF",
    padding: "2em 1em 2em 1em",
    textAlign: "center",
    marginTop: "2em",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ThemeWhiteModal = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    backgroundColor: "#FFF",
    padding: "2em 1em 2em 1em",
    textAlign: "center",
    marginTop: "2em",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function Cart({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  let token = sessionStorage.getItem("Token");

  const router = useRouter();

  const {
    totalUniqueItems,
    cartTotal,
    items,
    emptyCart,
    updateItemQuantity,
    removeItem,
  } = useCart();

  const HandleCart = () => {
    if (token === null) {
      return router.push("/login");
    }

    setIsOpen(!isOpen);
    if (isOpen == true) {
      emptyCart();
    }
  };

  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="cart" />
        <meta charset="UTF-8" />
        <meta name="keywords" content="store, ecommerce, product, organ, cart" />
        <meta name="author" content="JonathanSaan" />
      </Head>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className={theme ? styles.darkMode : styles.lightMode}>
        <div className={styles.card}>
          {items.length > 0 ? (
            <h1 className={styles.cardTitle}>Cart ({totalUniqueItems})</h1>
          ) : (
            <h1 className={styles.cardTitle}>Your Cart is Empty</h1>
          )}
          <div className={styles.card_container}>
            {items.length > 0 ? (
              <>
                {items.map((item) => (
                  <div className={styles.card_container_item} key={item.id}>
                    <CardMedia
                      component="img"
                      image={item.img}
                      title={item.name}
                      className={styles.card_container_itemImage}
                      loading="lazy"
                    ></CardMedia>

                    <div className={styles.card_container_item_leftdetail}>
                      <Link key={item.id} href={`product/${item.slug}`}>
                        <a className={styles.card_container_item_leftdetailName}>
                          {item.name}
                        </a>
                      </Link>
                      <p
                        onClick={() => removeItem(item.id)}
                        className={styles.card_container_item_leftdetailRemove}
                      >
                        remove
                      </p>
                    </div>

                    <div className={styles.card_container_item_rightdetail}>
                      <p className={styles.card_container_item_rightdetailPrice}>${item.price}</p>
                      <button
                        className={styles.UpdateItemQuantity}
                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <button className={styles.Quantity}>
                        <p>{item.quantity}</p>
                      </button>
                      <button
                        className={styles.UpdateItemQuantity}
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                <p className={styles.card_containerTotalPrice}>
                  Total:
                  <span className={styles.card_containerTotalPriceNumber}>${cartTotal}</span>
                </p>
                <button onClick={HandleCart} className={styles.card_containerPayButton}>
                  checkout
                </button>
              </>
            ) : null}
          </div>
        </div>

        <Modal
          isOpen={isOpen}
          onRequestClose={HandleCart}
          style={theme ? ThemeDarkModal : ThemeWhiteModal}
          contentLabel="My dialog"
        >
          <CheckCircleOutlinedIcon color="success" sx={{ fontSize: 80 }} />
          <h1>Thank you.</h1>
          <p>Your order was completed successfully. </p>
          <button
            onClick={HandleCart}
            style={{ margin: "1em 0 0 15em", padding: ".5em 1em" }}
          >
            Ok
          </button>
        </Modal>
      </div>
    </>
  );
}