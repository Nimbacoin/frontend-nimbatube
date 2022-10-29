import React from "react";
import Style from "../../styles/modals/button-black.module.css";
const CancelButton = ({ HandelClick, Text }: any) => {
  return (
    <button
      onClick={() => {
        if (HandelClick) {
          HandelClick();
        }
      }}
      className={Style.cancel_button}
    >
      {Text ? Text : "submit"}
    </button>
  );
};

export default CancelButton;
