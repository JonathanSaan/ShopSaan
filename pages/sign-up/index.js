import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";
  
import { Header } from "../../components/Header";
import { app } from "../../config/firebase";
import styles from "../../styles/SignUp.module.scss";

export default function SignUp({ theme, toggleTheme }) {
  const auth = getAuth();
  const router = useRouter();
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUp = (event) => {
    event.preventDefault();
    if (username === "" || email === "" || password === "" || confirmPassword === "") {
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
    };
    
    if (password !== confirmPassword) {
      return (
        toast.error("Passwords must be the same.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          draggable: true,
        })
      );
    };
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        sessionStorage.setItem("Token", response.user.accessToken);
        router.push("/");
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
        <title>Sign up</title>
        <meta name="description" content="sign up" />
        <meta charset="UTF-8" />
        <meta name="keywords" content="store, ecommerce, register, signup, sign up" />
        <meta name="author" content="JonathanSaan" />
      </Head>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className={theme ? styles.darkMode : styles.lightMode}>
        <div className={styles.signup_container}>
          <h1 className={styles.signup_containerTitle}>Sign Up</h1>
          <form className={styles.signup_container_form} onSubmit={signUp}>
            <input
              htmlFor="text"
              type="text"
              className={styles.signup_container_form_textInput}
              autoFocus={true}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
            />
            
            <input 
              htmlFor="email"
              type="email"
              className={styles.signup_container_form_textInput}
              autoFocus={true}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
            />
            
            <input 
              htmlFor="password"
              type="password"
              min="6"
              className={styles.signup_container_form_textInput}
              autoFocus={false}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            />
            
            <input 
              htmlFor="password"
              type="password"
              min="6"
              className={styles.signup_container_form_textInput}
              autoFocus={false}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm Password"
            />
          
            <button className={styles.signup_container_formButton}>
              Sign up
            </button>
          </form>
          
          <p>
            Already have an account? 
            <Link href={`/login`}>
              <a>Login </a>
            </Link>
          </p>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
};