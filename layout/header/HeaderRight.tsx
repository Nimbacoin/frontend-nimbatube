import React from "react";
import Style from "../../styles/layout/header/header-compnents/header-right.module.css";
import { useRouter } from "next/router";
import HeaderRightPhoneUserLogedOut from "./header-components/HeaderRightPhoneUserLogedOut";
import CancelButton from "../../components/modals/CancelButton";
import BlueButton from "../../components/modals/BlueButton";

const HeaderRight = () => {
  const Router = useRouter();
  const HandelPush = (Path: string) => {
    Router.push(Path);
  };
  return (
    <>
      <HeaderRightPhoneUserLogedOut />
      <div className={Style.container}>
        <CancelButton Text="Sign in" />
        <BlueButton Text={"Sign up"} />
      </div>
    </>
  );
};

export default HeaderRight;
