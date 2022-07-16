import { useState } from "react";
import Link from "next/link";

import { Dropdown } from "./Dropdown";
import { Cart } from "./Cart";
import styles from "../styles/Header.module.scss";

export const Header = ({theme, toggleTheme}) => {
  
  return (
    <header className={ theme ? styles.DarkMode : styles.LightMode}>
      <Link href="/">
        <a className={styles.Title}>ShopSaan </a>
      </Link>
      <Dropdown theme={theme} toggleTheme={toggleTheme} />
      <Cart theme={theme} toggleTheme={toggleTheme} />
    </header>
  );
};