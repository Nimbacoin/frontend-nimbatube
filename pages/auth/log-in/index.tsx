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
          />
          <input className={Style.input} placeholder="Enter your password" />{" "}
        </div>
        <div className={Style.container_actions}>
          <div className={Style.div_button_action}>
            <button className={Style.button_action}>Log in </button>
            <Link href={"/auth/sing-up"}>
              <button className={Style.button_action_add}>Sign up </button>
            </Link>
          </div>
          <div className={Style.opption_container}>
            <span className={Style.reset_password}>
              You forget your password,
              <Link href={"/auth/log-in"}>
                <span className={Style.reset_password_link}>
                  click here to rest your password.
                </span>
              </Link>
            </span>
            <span className={Style.accept_terms}>
              By continuing, you agree to NimbaTube's Terms of Use and Privacy
              Policy.
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
