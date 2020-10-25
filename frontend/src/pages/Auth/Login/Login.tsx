import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../../store/user";
import styles from "./Login.module.css";

export function Login() {
  const [username, setUsername] = useState("");
  function onSubmit(event: any) {
    event.preventDefault();
    login(username);
  }

  return (
    <form onSubmit={(e) => onSubmit(e)} className={`${styles.topMargin} ${styles.container}`}>
      <input onChange={(e) => setUsername(e.target.value)} required={true} className="input" placeholder="Username" type="text" />
      <button className={`${styles.topMargin} btn`}>Login</button>
      <Link className={`${styles.center} ${styles.topMargin}`} to="./signup">Register</Link>
    </form>
  );
}
