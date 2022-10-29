import React from "react";
import Style from "../../styles/modals/button-black.module.css";
const BlueButton = ({ HandelClick, Text }: any) => {
  return (
    <button
      onClick={() => {
        if (HandelClick) {
          HandelClick();
        }
      }}
      className={Style.blue_button}
    >
      {Text ? Text : "submit"}
    </button>
  );
};

export default BlueButton;
