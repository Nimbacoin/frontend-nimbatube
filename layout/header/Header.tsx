import React from "react";
import HeaderCenter from "./HeaderCenter";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";
import Style from "../../styles/layout/header/header.module.css";
import HeaderDropDown from "./header-components/HeaderDropDown";
import { useSelector } from "react-redux";

const Header = () => {
  const UserIsSignedIn = useSelector(
    (state: any) => state.UserSignIn.UserIsSignedIn
  );

  return (
    <div className={Style.container}>
      <HeaderLeft />
      <HeaderCenter />
      {UserIsSignedIn ? <HeaderDropDown /> : <HeaderRight />}
    </div>
  );
};

export default Header;
