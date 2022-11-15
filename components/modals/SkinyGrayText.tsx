import React from "react";
import Style from "../../styles/modals/text.module.css";

const SkinyGrayText = ({ Text, Icon }: any) => {
  return (
    <p className={Style.text_small}>
      {Icon && Icon} {Text}
    </p>
  );
};

export default SkinyGrayText;
