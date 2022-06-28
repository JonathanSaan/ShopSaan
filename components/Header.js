import Link from "next/link";

import { Dropdown } from "./Dropdown";
import styles from "../styles/Header.module.scss";

export const Header = () => {
  
  return (
    <header className={styles.Header}>
      <Link href="/">
        <a className={styles.Title}>ShopSaan </a>
      </Link>
      <Dropdown />
    </header>
  );
};