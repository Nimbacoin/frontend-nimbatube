import React from "react";
import Style from "../../styles/layout/header/header-compnents/header-right.module.css";
const HeaderRight = () => {
  return (
    <div className={Style.container}>
      <button className={Style.button_log_in}>log in</button>
      <button className={Style.button_singup}>Sing up</button>
    </div>
  );
};

export default HeaderRight;
