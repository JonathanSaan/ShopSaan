import { useState, useEffect } from "react";

import styles from "../styles/Alert.module.scss";

export const Alert = ({ theme }) => {
  const [showAlert, setShowAlert] = useState(
    sessionStorage.getItem("Alert") === "false" ? false : true
  );

  const handleAlert = () => {
    setShowAlert(!showAlert);
    sessionStorage.setItem("Alert", !showAlert);
  };

  useEffect(() => {
    sessionStorage.setItem("Alert", showAlert);
  }, [showAlert]);

  return (
    <>
      {showAlert && (
        <>
          <div className={styles.Background}></div>
          <dialog className={`${theme ? styles.DarkMode : styles.LightMode}`}>
            <h1>Alert</h1>
            <h2>
              This website was created solely for entertainment purposes by its
              creator, Jonathan Saan. Please be aware that all content presented
              on this site is fictional and does not represent real information
              or financial transactions. No real money purchases or spending are
              involved on this site.
            </h2>
            <button onClick={handleAlert}>Close</button>
          </dialog>
        </>
      )}
    </>
  );
};

export default Alert;
