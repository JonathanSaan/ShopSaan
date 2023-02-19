import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";

import { Header } from "../../components/Header";
import { app } from "../../config/firebase";
import styles from "../../styles/Login.module.scss";

export default function Login({ theme, toggleTheme }) {
  const auth = getAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        sessionStorage.setItem("Token", response.user.accessToken);
        router.push("/");
      })
      .catch(err => {
        return (
          toast.error("Unable to log in with provided credentials.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            draggable: true,
          })
        );
      })
  };
  
	useEffect(() => {
    let token = sessionStorage.getItem("Token");
    
    if(token){
      router.push("/");
    };
  }, []);
  
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="login" />
        <meta charset="UTF-8" />
        <meta name="keywords" content="store, ecommerce, login, sign in, signin" />
        <meta name="author" content="JonathanSaan" />
      </Head>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className={theme ? styles.darkMode : styles.lightMode}>
        <div className={styles.login_container}>
          <h1 className={styles.login_containerTitle}>Login</h1>
          <form className={styles.login_container_form} onSubmit={login}>
            <input 
              htmlFor="email"
              type="email"
              className={styles.login_container_form_textInput}
              autoFocus={true}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
            />

            <input 
              type="password"
              htmlFor="password"
              min="6"
              className={styles.login_container_form_textInput}
              autoFocus={false}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            />
          
            <button type="submit" className={styles.login_container_formButton}>
              Login
            </button>
          </form>
          
          <p>
            Do not have an account? 
            <Link href={`/sign-up`}>
              <a>Create new one </a>
            </Link>
          </p>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
};