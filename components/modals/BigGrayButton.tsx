import React from "react";
import Style from "../../styles/modals/big-gray-button.module.css";
import TextTilteInputMudum from "./text/TextTilteInputMudum";

import { IoCopyOutline } from "@react-icons/all-files/io5/IoCopyOutline";
import { poPUppRedcuer } from "../../redux/style-slice/general-style/GenrealStyle";
import { useDispatch } from "react-redux";

const BigGrayButton = ({
  Placeholder,
  Text,
  HandelChange,
  Number,
  Icon,
  Value,
  CopiedText,
  HandelCopy,
}: any) => {
  return (
    <div className={Style.upload_input}>
      <TextTilteInputMudum Icon={Icon && Icon} Text={Text} />
      <label onClick={HandelCopy} htmlFor="title" className={Style.input_label}>
        <TextTilteInputMudum Icon={Icon && Icon} Text={Value} />
      </label>
    </div>
  );
};

export default BigGrayButton;
