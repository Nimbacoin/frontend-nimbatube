import React from "react";
import Style from "../../../styles/pages/auth/log-in.module.css";
const LogIn = () => {
  return (
    <div className={Style.container}>
      <form className={Style.container_form}>
        <input className={Style.input} placeholder="enter your email" />{" "}
        <input className={Style.input} placeholder="enter your password" />
        <button>Log in </button>
      </form>
    </div>
  );
};

export default LogIn;
