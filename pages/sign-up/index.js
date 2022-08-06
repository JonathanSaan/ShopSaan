import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from "firebase/auth";

import GoogleIcon from "@mui/icons-material/Google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
  
import { Header } from "../../components/Header";
import { app } from "../../config/firebase";
import styles from "../../styles/SignUp.module.scss";

export default function SignUp({ theme, toggleTheme }) {
  
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const router = useRouter();
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUp = () => {
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
  
  const HandleForm = (event) => {
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
    signUp()
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
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
          
            <button onClick={HandleForm}>
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