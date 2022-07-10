import { useEffect, useState } from "react";

import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import GoogleIcon from "@mui/icons-material/Google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
  
import { Header } from "../../components/Header";
import styles from "../../styles/SignUp.module.scss";


export default function SignUp({ theme, toggleTheme }) {
  
  const { data: session } = useSession()
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  
  const HandleForm = () => {
    if (email === "" || password === "") {
      if (theme === false) {
        return (
          toast.error('Unable to log in with provided credentials.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            draggable: false,
          })
        );
      }
      
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
    
    if (password !== confirmPassword) {
      if (theme === false) {
        return (
          toast.error('Passwords must be the same.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            draggable: false,
          })
        );
      }
      
      return (
        toast.error('Passwords must be the same.', {
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
    
    return signIn("email");
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
          
          <form >
            <input 
              type="text" 
              required
              name="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
            />
            
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
            
            <input 
              type="password"
              required
              name="password"
              min="6"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          
            <button onClick={HandleForm}>
              Sign up
            </button>
            
            <button onClick={() => signIn("google")} className={styles.Chrome} >
              <GoogleIcon className={styles.ChromeIcon} size={25} /> Sign up with Google
            </button>
          </form>
          
          <p>
            Already have an account? 
            <Link href={`/login`}>
              Login
            </Link>
          </p>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
};