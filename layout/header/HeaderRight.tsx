import React from "react";
import Style from "../../styles/layout/header/header-compnents/header-right.module.css";
import { useRouter } from "next/router";
import HeaderRightPhoneUserLogedOut from "./header-components/HeaderRightPhoneUserLogedOut";
const HeaderRight = () => {
  const Router = useRouter();
  const HandelPush = (Path: string) => {
    Router.push(Path);
  };
  return (
    <>
      <HeaderRightPhoneUserLogedOut />
      <div className={Style.container}>
        <button
          onClick={() => HandelPush("/auth/sign-in")}
          className={Style.button_log_in}
        >
          Sign in
        </button>
        <button
          onClick={() => HandelPush("/auth/sign-up")}
          className={Style.button_singup}
        >
          Create account
        </button>
      </div>
    </>
  );
};

export default HeaderRight;
