import React from "react";
import Style from "../../styles/layout/header/header-compnents/header-right.module.css";
import { useRouter } from "next/router";
const HeaderRight = () => {
  const Router = useRouter();
  const HandelPush = (Path: string) => {
    Router.push(Path);
  };
  return (
    <div className={Style.container}>
      <button
        onClick={() => HandelPush("/auth/log-in")}
        className={Style.button_log_in}
      >
        Log in
      </button>
      <button
        onClick={() => HandelPush("/auth/sign-up")}
        className={Style.button_singup}
      >
        Sign up
      </button>
    </div>
  );
};

export default HeaderRight;
