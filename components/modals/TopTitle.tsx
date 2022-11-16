import React from "react";
import { IoVideocamOutline } from "@react-icons/all-files/io5/IoVideocamOutline";
import Style from "../../styles/modals/top-title.module.css";
import NormalText from "./NormalText";
import TextTilteInputMudum from "./text/TextTilteInputMudum";

const TopTitle = ({ Icon, Text }: any) => {
  return (
    <div className={Style.upload_container}>
      <div className={Style.container_elements}>
        {Icon && Icon}
        {Text && <TextTilteInputMudum Text={Text} />}
      </div>
      <div className={Style.border_div}></div>
    </div>
  );
};

export default TopTitle;
