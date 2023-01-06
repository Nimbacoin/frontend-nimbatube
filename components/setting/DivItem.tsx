import React from "react";
import Style from "../../styles/pages/setting/div-item.module.css";
import TextTilteInputMudum from "../modals/text/TextTilteInputMudum";

const DivItem = ({ Item }: any) => {
  return (
    <div className={Style.container}>
      <TextTilteInputMudum Text={Item.name} />
    </div>
  );
};

export default DivItem;
