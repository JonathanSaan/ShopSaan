import { Header } from "../Header"

export default function Cart() {
  return (
    <>
      <Head>
        <title>Cart </title>
      </Head>
      <Header theme={theme} toggleTheme={toggleTheme}/>
      <div>
        <h1>Cart </h1>
      </div>
    </>
  );
};