import React from "react";
import Style from "../../styles/modals/copy-input.module.css";
import TextTilteInputMudum from "./text/TextTilteInputMudum";

import { IoCopyOutline } from "@react-icons/all-files/io5/IoCopyOutline";
import { poPUppRedcuer } from "../../redux/style-slice/general-style/GenrealStyle";
import { useDispatch } from "react-redux";

const CopyInput = ({
  Placeholder,
  Text,
  HandelChange,
  Number,
  Icon,
  Value,
}: any) => {
  const dispatch = useDispatch();
  const handelCopy = () => {
    navigator.clipboard.writeText(Value);
    dispatch(poPUppRedcuer({ data: "video Linke copied" }));
    setTimeout(() => {
      dispatch(poPUppRedcuer({ data: "" }));
    }, 5000);
  };
  return (
    <div className={Style.upload_input}>
      <TextTilteInputMudum Icon={Icon && Icon} Text={Text} />
      <label onClick={handelCopy} htmlFor="title" className={Style.input_label}>
        <input
          id="title"
          value={Value && Value}
          placeholder={Placeholder}
          onChange={HandelChange}
          type={Number ? "number" : "text"}
          className={Style.input_title}
        />
        <span className={Style.main_button}>
          <IoCopyOutline />
        </span>
      </label>
    </div>
  );
};

export default CopyInput;
