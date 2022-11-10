import React from "react";
import Style from "../../styles/layout/header/header-compnents/header-right.module.css";
import { useRouter } from "next/router";
import HeaderRightPhoneUserLogedOut from "./header-components/HeaderRightPhoneUserLogedOut";
import CancelButton from "../../components/modals/CancelButton";
import BlueButton from "../../components/modals/BlueButton";
import Link from "next/link"; //import this

const HeaderRight = () => {
  const Router = useRouter();
  const HandelPush = (Path: string) => {
    Router.push(Path);
  };
  return (
    <>
      <HeaderRightPhoneUserLogedOut />
      <div className={Style.container}>
        <Link href="/auth/sign-in">
          <a>
            <CancelButton Text="Sign in" />
          </a>
        </Link>

        <Link href="/auth/sign-up">
          <a>
            <BlueButton
              // HandelClick={HandelPush("/auth/sign-up")}
              Text={"Sign up"}
            />
          </a>
        </Link>
      </div>
    </>
  );
};

export default HeaderRight;
