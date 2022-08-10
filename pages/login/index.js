import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import GoogleIcon from "@mui/icons-material/Google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";

import { Header } from "../../components/Header";
import { app } from "../../config/firebase";
import styles from "../../styles/Login.module.scss";

export default function Login({ theme, toggleTheme }) {
  
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    event.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user)
        sessionStorage.setItem("Token", response.user.accessToken);
        router.push("/")
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

  const LoginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((response) => {
        sessionStorage.setItem("Token", response.user.accessToken)
        console.log(response.user)
        router.push("/")
      })
  };
    
	useEffect(() => {
    let token = sessionStorage.getItem("Token")
    
    if(token){
      router.push("/")
    }
  }, []);
  
  return (
    <>
      <Head>
        <title>Login </title>
        <meta name="description" content="login" />
        <meta charset="UTF-8" />
        <meta name="keywords" content="store, ecommerce, login, sign in, signin" />
        <meta name="author" content="JonathanSaan" />
      </Head>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className={theme ? styles.DarkMode : styles.LightMode}>
        <div className={styles.Container}>
          <h1 className={styles.Title}>Login</h1>
          
          <form>
            <input 
              htmlFor="email"
              type="email" 
              autoFocus={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input 
              type="password"
              htmlFor="password"
              autoFocus={false}
              min="6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          
            <button onClick={login}>
              Login
            </button>
            
            <button onClick={LoginWithGoogle} className={styles.Chrome}>
              <GoogleIcon className={styles.ChromeIcon} size={25} /> Login with Google
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