import React from "react";
import Style from "../../styles/modals/input-text.module.css";

const SmallTextBlack = ({ Text, Icon }: any) => {
  return (
    <p className={Style.small_text_back}>
      {Icon && Icon} {Text}
    </p>
  );
};

export default SmallTextBlack;
