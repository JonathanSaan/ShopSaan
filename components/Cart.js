import Link from "next/link";

import { IconButton } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import styles from "../styles/Header.module.scss";

export const Cart = ({ theme, toggleTheme }) => {
  
  return (
    <IconButton className={styles.IconButton} aria-label="user" >
      <Link className={styles.IconButton} href="/cart">
        <ShoppingCartOutlinedIcon className={styles.IconUser} />
      </Link>
    </IconButton>
  );
};