import React from "react";
import Style from "../../../styles/modals/input-text.module.css";

const TextTilteInputMudum = ({ Text, Icon }: any) => {
  return (
    <p className={Style.text}>
      {Icon && Icon} {Text}
    </p>
  );
};

export default TextTilteInputMudum;
