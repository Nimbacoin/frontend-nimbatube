import React from "react";
import Style from "../../styles/modals/pop-upp.module.css";

const GoogleIcon = ({ IconName, Fill, Sharp }: any) => {
  return (
    <p
      className={
        Fill ? Style.material_symbols_fill : Style.material_symbols_outlined
      }
    >
      <span
        className={
          Sharp ? "material-symbols-sharp" : "material-symbols-rounded"
        }
      >
        {IconName}
      </span>
    </p>
  );
};
export default GoogleIcon;
