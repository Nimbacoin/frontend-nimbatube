import Link from "next/link";
import React, { useState } from "react";
import Style from "../../../styles/pages/auth/log-in.module.css";
import { useRouter } from "next/router";
import basedPostUrlRequest from "../../../utils/basedPostUrlRequest";
import { useDispatch, useSelector } from "react-redux";
import { IoWarningOutline } from "@react-icons/all-files/io5/IoWarningOutline";
import { UserSignedIn } from "../../../redux/user-slice/UserSignIn";
import Cookies from "js-cookie";
import basedGetUrlRequest from "../../../utils/basedGetUrlRequest";
import basedPostUrlRequestLogedIn from "../../../utils/basedPostUrlRequestLogedIn";
import InputText from "../../../components/modals/InputText";

const errors = [
  {
    name: "WrongPassWord",
    value: "Wrong password please try again.",
  },
  {
    name: "EamilNotFinded",
    value: "Email was not finnded please try again or sign-up instead.",
  },
  {
    name: "RandomTextNotEmailAdress",
    value: "this text does not seems to be a email address please",
  },
  {
    name: "PasswordNotMatch",
    value: "Password not matched",
  },
  {
    name: "ShortPassWord",
    value: "password is too short, password should cotain at less 8 characters",
  },
  {
    name: "AvalibleEmail",
    value: " Sorry this email is arlady avalible",
  },
];
const SignUp = () => {
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [conifirmpassword, setconifirmpassword] = useState("");
  const [ResMessage, setResMessage] = useState<string>("");
  const [Error, setError] = useState<string>("");
  const Router = useRouter();
  const WindowHeight = useSelector(
    (state: any) => state.GenrealStyle.WindowHeight
  );
  const UserIsSignedIn = useSelector(
    (state: any) => state.UserSignIn.UserIsSignedIn
  );

  const HandelSignUp = async (e: any) => {
    e.preventDefault();
    const Body: any = { email, password, conifirmpassword, username };
    setError("");
    setResMessage("");
    basedPostUrlRequest("/api/auth/sign-up", Body).then((res) => {
      if (res) {
        if (res.user) {
          Cookies.set("user", JSON.stringify(res.user));
          // sessionStorage.setItem("user", JSON.stringify(res.user));
          dispatch(UserSignedIn(res.user));
          setResMessage(res.message);
          const HandelSubmiteInitChannel = async () => {
            const ReqData: any = { general: "", images: "" };
            await basedPostUrlRequestLogedIn(
              "/api/post/channel/init-channel/",
              ReqData
            ).then((res) => {
              if (res?.responsData) {
                Router.push(
                  "/channel/create-new-channel/" + res?.responsData?._id
                );
              }
            });
          };
          HandelSubmiteInitChannel();
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
        <div className={Style.container_form}>
          <form className={Style.form} onSubmit={HandelSignUp}>
            <InputText
              HandelChange={(e: any) => {
                setemail(e.target.value);
              }}
              Text={"full name"}
              Placeholder="enter your full name"
            />
            <div className={Style.error_container}>
              {}
              {Error === "RandomTextNotEmailAdress" ||
                (Error === "AvalibleEmail" && (
                  <span className={Style.error_message}>
                    <IoWarningOutline /> {ResMessage}
                  </span>
                ))}
            </div>

            <InputText
              HandelChange={(e: any) => {
                setusername(e.target.value);
              }}
              Text={"email address"}
              Placeholder="enter your username"
            />

            <div className={Style.error_container}>
              {Error === "EamilNotFinded" && (
                <span className={Style.error_message}>
                  {" "}
                  <IoWarningOutline /> {ResMessage}
                </span>
              )}
            </div>

            <InputText
              HandelChange={(e: any) => {
                setpassword(e.target.value);
              }}
              Text={"password"}
              Placeholder="enter your password"
            />
            <div className={Style.error_container}>
              {Error === "ShortPassWord" && (
                <p className={Style.error_message}>
                  <IoWarningOutline />
                  {ResMessage}
                </p>
              )}
            </div>
            <InputText
              HandelChange={(e: any) => {
                setconifirmpassword(e.target.value);
              }}
              Text={"confirm password"}
              Placeholder="enter your password again"
            />
            <div className={Style.error_container}>
              {Error === "PasswordNotMatch" && (
                <p className={Style.error_message}>
                  <IoWarningOutline />
                  {ResMessage}
                </p>
              )}
            </div>
            <div className={Style.container_actions}>
              <div className={Style.div_button_action}>
                <button type="submit" className={Style.button_action}>
                  Sign up{" "}
                </button>
                <Link href={"/auth/sign-in"}>
                  <button className={Style.button_action_add}>Sign In </button>
                </Link>
              </div>
              <div className={Style.opption_container}>
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

export default SignUp;
