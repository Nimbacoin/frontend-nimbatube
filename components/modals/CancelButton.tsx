import React from "react";
import Style from "../../styles/modals/button-black.module.css";
const CancelButton = ({ HandelClick, Text, IconFirst }: any) => {
  return (
    <button
      onClick={() => {
        if (HandelClick) {
          HandelClick();
        }
      }}
      className={Style.cancel_button}
    >
      {IconFirst && IconFirst }  {Text ? Text : "submit"}
    </button>
  );
};

export default CancelButton;
