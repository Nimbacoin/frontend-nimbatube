import React from "react";
import Style from "../../styles/modals/input-text.module.css";
import TextTilteInputMudum from "./TextTilteInputMudum";

const InputText = ({ Placeholder, Text, HandelChange }: any) => {
  return (
    <div className={Style.upload_input}>
      <TextTilteInputMudum Text={Text} />
      <label htmlFor="title" className={Style.input_label}>
        <input
          id="title"
          placeholder={Placeholder}
          onChange={HandelChange}
          type="text"
          className={Style.input_title}
        />
      </label>
    </div>
  );
};

export default InputText;
