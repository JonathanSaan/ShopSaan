import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import GoogleIcon from "@mui/icons-material/Google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
	getAuth,
	signInWithEmailAndPassword,
	onAuthStateChanged
} from "../../config/firebase";
import { Header } from "../../components/Header";
import styles from "../../styles/Login.module.scss";
import { AuthContext } from "../../components/context/AuthContext";

export default function Login({ theme, toggleTheme }) {
  const { username, setUsername } = useContext(AuthContext);
	const { email, setEmail } = useContext(AuthContext);
	const { password, setPassword } = useContext(AuthContext);
	const { emailErr, setEmailErr } = useContext(AuthContext);
	const { passwordErr, setPasswordErr } = useContext(AuthContext);
	const router = useRouter();
	const auth = getAuth();
	
	
  const HandleForm = (event) => {
    event.preventDefault()
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
    clearErrs();

		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				setPassword('');
				router.push('/');
			})
			.catch((err) => {
				const { code, message } = err;

				if (
					code === 'auth/invalid-email' ||
					code === 'auth/user-disabled' ||
					code === 'auth/user-not-found'
				) {
					setEmailErr(message);
				}

				if (code === 'auth/wrong-password') {
					setPasswordErr(message);
				}
			});
  };
  
  const clearErrs = () => {
		setEmailErr('');
		setPasswordErr('');
	};
	
	const authListener = () => {
		onAuthStateChanged(auth, (username) => {
			if (username) {
				setPassword('');
				setUsername(username);
			} else {
				setUsername('');
			}
		});
	};
	
  useEffect(() => {
    window.scrollTo(0, 0);
    authListener();
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
              required
              autoFocus={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              err={emailErr}
            />
            <input 
              type="password"
              htmlFor="password"
              required
              autoFocus={false}
              min="6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              err={passwordErr}
              placeholder="Password"
            />
          
            <button onClick={HandleForm}>
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