import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../../../store/user";
import styles from "./Signup.module.css";

export function Signup() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  function onSubmit(event: any) {
    event.preventDefault();
    signup(name, username);
  }
  return (
    <form onSubmit={(e) => onSubmit(e)} className={`${styles.topMargin} ${styles.container}`}>
      <input onChange={(e) => setName(e.target.value)} required={true} className="input" placeholder="Your Name" type="text" />
      <input onChange={(e) => setUsername(e.target.value)} required={true} className={`${styles.topMargin} input`} placeholder="Username" type="text" />
      <button className={`${styles.topMargin} btn`}>Signup</button>
      <Link className={`${styles.center} ${styles.topMargin}`} to="./login">Login</Link>
    </form>
  );
}
