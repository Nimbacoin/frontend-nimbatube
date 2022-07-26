import Link from "next/link";
import React from "react";
import Style from "../../../styles/pages/auth/log-in.module.css";
const LogIn = () => {
  return (
    <div className={Style.container}>
      <form className={Style.container_form}>
        <div className={Style.container_inputs}>
          <input
            className={Style.input}
            placeholder="Enter your Email, Username"
          />{" "}
          <input className={Style.input} placeholder="Enter your password" />{" "}
        </div>
        <div className={Style.container_actions}>
          <div className={Style.div_button_action}>
            <button className={Style.button_action}>Sing up </button>
            <Link href={"/auth/log-in"}>
              <button className={Style.button_action_add}>Log in </button>
            </Link>
          </div>
          <span className={Style.accept_terms}>
            By continuing, you agree to NimbaTube's Terms of Use and Privacy
            Policy.
          </span>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
