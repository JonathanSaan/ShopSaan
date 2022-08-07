import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import GoogleIcon from "@mui/icons-material/Google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from "firebase/auth";

import { app } from "../../config/firebase";
import { Header } from "../../components/Header";
import styles from "../../styles/Login.module.scss";

export default function Login({ theme, toggleTheme }) {
  
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = () => {
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

  const signUpWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((response) => {
        sessionStorage.setItem("Token", response.user.accessToken)
        console.log(response.user)
        router.push("/")
      })
  };
    
  const HandleForm = (event) => {
    event.preventDefault()
    signUp()
  };
	
	useEffect(() => {
    let token = sessionStorage.getItem("Token")

    if(token){
      router.push("/")
    }
  }, []);
  
  return (
    <>
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
          
            <button onClick={HandleForm}>
              Login
            </button>
            
            <button onClick={signUpWithGoogle} className={styles.Chrome}>
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