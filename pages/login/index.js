import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { ToastContainer } from "react-toastify";
import { CircularProgress } from "react-cssfx-loading";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../config/firebase";
import Header from "../../components/Header";
import ErrorForm from "../../utils/ErrorForm";
import styles from "../../styles/Login.module.scss";

export default function Login({ theme, toggleTheme }) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await signInWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem("Token", response.user.accessToken);
      router.push("/");
    } catch (error) {
      setLoading(false);
      ErrorForm("Unable to log in with provided credentials.");
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
        <title>Login</title>
        <meta name="description" content="login" />
        <meta charset="UTF-8" />
        <meta
          name="keywords"
          content="store, ecommerce, login, sign in, signin"
        />
        <meta name="author" content="JonathanSaan" />
      </Head>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className={theme ? styles.darkMode : styles.lightMode}>
        <div className={styles.login_container}>
          <h1 className={styles.login_containerTitle}>Login</h1>
          <form className={styles.login_container_form} onSubmit={login}>
            <input
              htmlFor="email"
              type="email"
              className={styles.login_container_form_textInput}
              autoFocus={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <input
              type="password"
              htmlFor="password"
              min="6"
              className={styles.login_container_form_textInput}
              autoFocus={false}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <button disabled={loading} className={styles.login_container_formButton}>
              {loading ? <CircularProgress color={"#f5f7f6"} height="2em" width="2em" /> : "Login"}
            </button>
          </form>

          <p>
            Do not have an account?
            <Link href={`/sign-up`}>
              <a>Create new one </a>
            </Link>
          </p>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
