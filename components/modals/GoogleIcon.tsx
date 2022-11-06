import React from "react";
import Style from "../../styles/modals/pop-upp.module.css";

const GoogleIcon = ({ IconName, Fill }: any) => {
  return (
    <p
      className={
        Fill ? Style.material_symbols_fill : Style.material_symbols_outlined
      }
    >
      <span className={"material-symbols-rounded"}>{IconName}</span>
    </p>
  );
};
export default GoogleIcon;
