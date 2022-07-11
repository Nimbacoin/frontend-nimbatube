import React from "react";
import Style from "../../styles/layout/header/header-compnents/header-right.module.css";
import MyAccount from "./header-components/MyAccount";
import Bookings from "./header-components/Bookings";
import WishList from "./header-components/WishList";
import LangAndCurrency from "./header-components/LangAndCurrency";
const HeaderRight = () => {
  return (
    <div className={Style.container}>
      <button className={Style.button_log_in}>log in</button>
      <button className={Style.button_singup}>Sing up</button>
    </div>
  );
};

export default HeaderRight;
