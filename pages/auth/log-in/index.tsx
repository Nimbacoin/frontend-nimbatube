import Link from "next/link";
import React, { useState } from "react";
import Style from "../../../styles/pages/auth/log-in.module.css";
import { useRouter } from "next/router";
import basedPostUrlRequest from "../../../utils/basedPostUrlRequest";

import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
} from "next-auth/react";

const errors = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  WrongPassWord: "Wrong PassWord",
  default: "Unable to sign in.",
};
const LogIn = ({ providers, csrfToken }: any) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [ResMessage, setResMessage] = useState("");

  // const ResMessage = ResMessage && (errors[ResMessage] ?? errors.default);
  const HandelLogIn = async (e: any) => {
    e.preventDefault();
    const Body = { email, password };
    basedPostUrlRequest("/api/auth/sign-in", Body).then((res) => {
      if (res) {
        if (res.user) {
          sessionStorage.setItem("user", JSON.stringify(res.user));
          setResMessage(res.message);
        } else if (!res.user && res.message) {
          setResMessage(errors[ResMessage] ?? errors.default);
        }
      }
    });
  };
  return (
    <div className={Style.container}>
      {ResMessage}
      <form className={Style.container_form} onSubmit={HandelLogIn}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label className={Style.container_inputs}>
          <input
            onChange={(e) => {
              setemail(e.target.value);
            }}
            className={Style.input}
            placeholder="Enter your Email, Username"
            name="username"
            type="text"
          />
          <label className={Style.container_inputs}>
            <input
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              className={Style.input}
              name="password"
              type="password"
              placeholder="Enter your password"
            />{" "}
          </label>
        </label>
        <div className={Style.container_actions}>
          <div className={Style.div_button_action}>
            <button type="submit" className={Style.button_action}>
              Log in{" "}
            </button>
            <Link href={"/auth/sign-up"}>
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

export async function getServerSideProps(context: any) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: {
      providers: await getProviders(context),
      csrfToken: await getCsrfToken(context),
    },
  };
}
