import Link from "next/link";

import { useCart } from "react-use-cart";
import { IconButton } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import styles from "../styles/Header.module.scss";

export const Cart = () => {
  
  const { totalUniqueItems } = useCart();
  
  return (
    <IconButton className={styles.IconButton} aria-label="user" >
      {totalUniqueItems === 0 ?
        null
        :
        <p className={styles.TotalItemsCart}>
          {totalUniqueItems}
        </p>
      }
      <Link className={styles.IconButton} href="/cart">
        <ShoppingCartOutlinedIcon className={styles.Icon} />
      </Link>
    </IconButton>
  );
};