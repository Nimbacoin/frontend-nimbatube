import React from "react";
import Style from "../../styles/modals/button-black.module.css";
const ButtonBlack = ({ HandelClick, Text }: any) => {
  const HandelClicked = () => {
    HandelClick && HandelClick()
   
  };
  return (
    <button onClick={HandelClicked} className={Style.follow_button_black}>
      {Text ? Text : "Subscribe"}
    </button>
  );
};

export default ButtonBlack;
