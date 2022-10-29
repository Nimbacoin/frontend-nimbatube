import React from "react";
import Style from "../../styles/modals/bold-text.module.css";

const BoldText = ({ text }: any) => {
  return <p className={Style.text}> {text && text}</p>;
};

export default BoldText;
