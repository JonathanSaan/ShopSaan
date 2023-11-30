import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { ToastContainer } from "react-toastify";
import { CircularProgress } from "react-cssfx-loading";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../config/firebase";
import Header from "../../components/Header";
import ErrorForm from "../../utils/ErrorForm";
import styles from "../../styles/SignUp.module.scss";

export default function SignUp({ theme, toggleTheme }) {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const signUp = async (event) => {
    event.preventDefault();
    
    try {
      if (password !== confirmPassword) {
        return ErrorForm("Passwords must be the same.");
      }
	  setLoading(true);
      const response = await createUserWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem("Token", response.user.accessToken);
      router.push("/");
    } catch (error) {
      setLoading(false);
      ErrorForm("Unable to sign up with provided credentials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let token = sessionStorage.getItem("Token");

    if (token) {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Sign up</title>
        <meta name="description" content="sign up" />
        <meta charset="UTF-8" />
        <meta
          name="keywords"
          content="store, ecommerce, register, signup, sign up"
        />
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
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />

            <input
              htmlFor="email"
              type="email"
              className={styles.signup_container_form_textInput}
              autoFocus={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <input
              htmlFor="password"
              type="password"
              min="6"
              className={styles.signup_container_form_textInput}
              autoFocus={false}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <input
              htmlFor="password"
              type="password"
              min="6"
              className={styles.signup_container_form_textInput}
              autoFocus={false}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />

            <button disabled={loading} className={styles.signup_container_formButton}>
              {loading ? <CircularProgress color={"#f5f7f6"} height="2em" width="2em" /> : "Sign up"}
            </button>
          </form>

          <p>
            Already have an account?
            <Link href={`/login`}>
              <a>Login </a>
            </Link>
          </p>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
