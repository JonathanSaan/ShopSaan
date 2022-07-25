import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import GoogleIcon from "@mui/icons-material/Google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
  
import { Header } from "../../components/Header";
import { AuthContext } from "../../components/context/AuthContext";
import { getAuth, createUserWithEmailAndPassword } from '../../config/firebase';

import styles from "../../styles/SignUp.module.scss";

export default function SignUp({ theme, toggleTheme }) {
  
  const { username, setUsername } = useContext(AuthContext);
  const { email, setEmail } = useContext(AuthContext);
	const { password, setPassword } = useContext(AuthContext);
  const { confirmPassword, setConfirmPassword } = useContext(AuthContext);
  const { usernameErr, setUsernameErr } = useContext(AuthContext);
	const { emailErr, setEmailErr } = useContext(AuthContext);
	const { passwordErr, setPasswordErr } = useContext(AuthContext);
  const { confirmPasswordErr, setConfirmPasswordErr } = useContext(AuthContext);
	const router = useRouter();

  
  const clearInput = () => {
    setUsername('');
		setEmail('');
		setPassword('');
		setConfirmPassword('');
	};
	
	const clearErrs = () => {
	  setUsernameErr('');
		setEmailErr('');
		setPasswordErr('');
		setConfirmPasswordErr('');
	};
  
  
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
    
    if (password !== confirmPassword) {
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
  
    clearErrs();
    
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				clearInput();
				router.push('/login');
			})
			.catch((err) => {
				const { code, message } = err;

				if (
					code === 'auth/email-already-in-use' ||
					code === 'auth/invalid-email'
				) {
					setEmailErr(message);
				}

				if (code === 'auth/weak-password') {
					setPasswordErr(message);
				}
			});
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
              required
              name="text"
              autoFocus={true}
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
              err={usernameErr}
            />
            
            <input 
              type="email" 
              required
              name="email"
              autoFocus={true}
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              err={emailErr}
            />
            
            <input 
              type="password"
              required
              name="password"
              min="6"
              autoFocus={false}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              err={passwordErr}
            />
            
            <input 
              type="password"
              required
              name="password"
              min="6"
              autoFocus={false}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              err={confirmPasswordErr}
            />
          
            <button onClick={HandleForm}>
              Sign up
            </button>
            
            <button className={styles.Chrome} >
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