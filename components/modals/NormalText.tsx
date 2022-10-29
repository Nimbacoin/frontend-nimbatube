import React from "react";
import Style from "../../styles/modals/input-text.module.css";

const NormalText = ({ Text }: any) => {
  return <p className={Style.norml_text}>{Text}</p>;
};

export default NormalText;
