import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import GoogleIcon from "@mui/icons-material/Google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
  
import { Header } from "../../components/Header";
import { app } from "../../config/firebase";
import styles from "../../styles/SignUp.module.scss";

export default function SignUp({ theme, toggleTheme }) {
  
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const router = useRouter();
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUp = (event) => {
    event.preventDefault()
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
        console.log(response.user)
        sessionStorage.setItem("Token", response.user.accessToken);
        router.push("/")
      })
  };

  const signUpWithGoogle = () => {
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
  }, [])
  
  return (
    <>
      <Head>
        <title>Sign up </title>
        <meta name="description" content="sign up" />
        <meta charset="UTF-8" />
        <meta name="keywords" content="store, ecommerce, register, signup, sign up" />
        <meta name="author" content="JonathanSaan" />
      </Head>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className={theme ? styles.DarkMode : styles.LightMode}>
        <div className={styles.Container}>
          <h1 className={styles.Title}>Sign Up</h1>
          
          <form>
            <input 
              type="text" 
              name="text"
              autoFocus={true}
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
            />
            
            <input 
              type="email" 
              name="email"
              autoFocus={true}
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
            />
            
            <input 
              type="password"
              name="password"
              min="6"
              autoFocus={false}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
            />
            
            <input 
              type="password"
              name="password"
              min="6"
              autoFocus={false}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          
            <button onClick={signUp}>
              Sign up
            </button>
            
            <button onClick={signUpWithGoogle} className={styles.Chrome} >
              <GoogleIcon className={styles.ChromeIcon} size={25} /> Sign up with Google
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