import React from "react";
import Header from "../components/header/Header";
import styles from "../styles/Home.module.css";
import Login from "../Views/login/Login";
export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
<Login/>
      </main>
    </>
  );
}