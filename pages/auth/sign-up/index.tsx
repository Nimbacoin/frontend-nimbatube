import Link from "next/link";
import React from "react";
import Style from "../../../styles/pages/auth/log-in.module.css";
const SignUp = () => {
  return (
    <div className={Style.container}>
      <form className={Style.container_form}>
        <div className={Style.title}>
          <span className={Style.title}>Join</span>
        </div>

        <div className={Style.container_inputs}>
          <input className={Style.input} placeholder="Enter your Email" />
          <input className={Style.input} placeholder="Enter your Username" />
          <input
            className={Style.input}
            placeholder="Enter your password"
          />{" "}
        </div>
        <div className={Style.container_actions}>
          <div className={Style.div_button_action}>
            <button className={Style.button_action}>Sign up </button>
            <Link href={"/auth/log-in"}>
              <button className={Style.button_action_add}>Log in </button>
            </Link>
          </div>
          <div className={Style.opption_container}>
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

export default SignUp;
