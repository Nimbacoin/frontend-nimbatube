import Link from "next/link";
import React, { useState } from "react";
import Style from "../../../styles/pages/auth/log-in.module.css";
import basedPostUrlRequest from "../../../utils/basedPostUrlRequest";
const SignUp = () => {
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [conifrmpassword, setconifrmpassword] = useState("");

  const HandelSignUp = async (e: any) => {
    e.preventDefault();
    const Body = { email, password, conifrmpassword, username };
    basedPostUrlRequest("/api/auth/sign-up", Body).then((HSD) => {
      console.log(HSD);
    });
  };
  const HandelChange = (e: any, EventHandler: any) => {
    EventHandler(e.target.value);
  };
  return (
    <div className={Style.container}>
      <form className={Style.container_form} onSubmit={HandelSignUp}>
        <div className={Style.title}>
          <span className={Style.title}>Join</span>
        </div>

        <div className={Style.container_inputs}>
          {email}
          <input
            onChange={(e) => {
              setemail(e.target.value);
            }}
            className={Style.input}
            placeholder="Enter your Email"
          />
          <input
            className={Style.input}
            onChange={(e) => {
              setusername(e.target.value);
            }}
            placeholder="Enter your Username"
          />
          <input
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            type="password"
            className={Style.input}
            placeholder="Enter your password"
          />
          <input
            onChange={(e) => {
              setconifrmpassword(e.target.value);
            }}
            type="password"
            className={Style.input}
            placeholder="Enter your password"
          />
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
