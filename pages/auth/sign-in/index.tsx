import Link from "next/link";
import React, { useState } from "react";
import Style from "../../../styles/pages/auth/log-in.module.css";
import { useRouter } from "next/router";
import basedPostUrlRequest from "../../../utils/basedPostUrlRequest";
import { useDispatch, useSelector } from "react-redux";
import { IoWarningOutline } from "@react-icons/all-files/io5/IoWarningOutline";
import { UserSignedIn } from "../../../redux/user-slice/UserSignIn";
import Cookies from "js-cookie";
import InputText from "../../../components/modals/InputText";
import InputPassword from "../../../components/modals/InputPassword";

//
const errors = [
  {
    name: "WrongPassWord",
    value: "Wrong password please try again.",
  },
  {
    name: "EamilNotFinded",
    value: "Email was not finnded please try again or sign-up instead.",
  },
];
const LogIn = () => {
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [ResMessage, setResMessage] = useState<string>("");
  const [Error, setError] = useState<string>("");
  const Router = useRouter();

  const WindowHeight = useSelector(
    (state: any) => state.GenrealStyle.WindowHeight
  );
  const UserIsSignedIn = useSelector(
    (state: any) => state.UserSignIn.UserIsSignedIn
  );
  const HandelLogIn = async (e: any) => {
    e.preventDefault();
    const Body: any = { email, password };
    basedPostUrlRequest("/api/auth/sign-in", Body).then((res) => {
      if (res) {
        if (res.user) {
          Cookies.set("user", JSON.stringify(res.user));
          Cookies.set("expires", "Fri, 31 Dec 9999 23:59:59 GMT");
          // sessionStorage.setItem("user", JSON.stringify(res.user));
          dispatch(UserSignedIn(res.user));
          Router.push("/");
          setResMessage(res.message);
        } else if (!res.user && res.message) {
          setError(res.message);
          errors.map(({ name, value }) => {
            if (name === res.message) {
              setResMessage(value);
            }
          });
        }
      }
    });
  };

  return (
    <div style={{ minHeight: `${WindowHeight}px` }} className={Style.container}>
      {!UserIsSignedIn && (
        <div className={Style.container_form} onSubmit={HandelLogIn}>
          <form className={Style.form} onSubmit={HandelLogIn}>
            <InputText
              HandelChange={(e: any) => {
                setemail(e.target.value);
              }}
              Text={"email address"}
              Placeholder="enter your email address"
            />
            <div className={Style.error_container}>
              {Error === "EamilNotFinded" && (
                <span className={Style.error_message}>
                  {" "}
                  <IoWarningOutline /> {ResMessage}
                </span>
              )}
            </div>
            <InputPassword
              HandelChange={(e: any) => {
                setpassword(e.target.value);
              }}
              Text={"Password"}
              Placeholder="enter your video Password"
            />
            <div className={Style.error_container}>
              {Error === "WrongPassWord" && (
                <p className={Style.error_message}>
                  <IoWarningOutline />
                  {ResMessage}
                </p>
              )}
            </div>
            <div className={Style.container_actions}>
              <div className={Style.div_button_action}>
                <button
                  type="submit"
                  onClick={HandelLogIn}
                  className={Style.button_action}
                >
                  Sign in{" "}
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
                  By continuing, you agree to NimbaTube's Terms of Use and
                  Privacy Policy.
                </span>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LogIn;
