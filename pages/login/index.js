import { useEffect, useState } from "react";

import Link from "next/link";
import GoogleIcon from "@mui/icons-material/Google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Header } from "../../components/Header";
import styles from "../../styles/Login.module.scss";


export default function Login({ theme, toggleTheme }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const HandleForm = () => {
    if (email === "" || password === "") {
      return (
        toast.error('Unable to log in with provided credentials.', {
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
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className={theme ? styles.DarkMode : styles.LightMode}>
        <div className={styles.Container}>
          <h1 className={styles.Title}>Login</h1>
          
          <form >
            <input 
              type="email" 
              required
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input 
              type="password"
              required
              name="password"
              min="6"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
            />
          
            <button  onClick={HandleForm} >
              Login
            </button>
            
            <button className={styles.Chrome}>
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