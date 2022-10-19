import React from "react";
import Style from "../../styles/modals/button-black.module.css";
const ButtonBlack = () => {
  const HandelClick = () => {};
  return (
    <button onClick={HandelClick} className={Style.follow_button_black}>
      Subscribe
    </button>
  );
};

export default ButtonBlack;
