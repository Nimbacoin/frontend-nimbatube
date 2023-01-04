import React from "react";
import Style from "../../styles/pages/setting/div-item.module.css";

const DivItem = ({ Item }: any) => {
  return <div className={Style.container}>{Item.name}</div>;
};

export default DivItem;
