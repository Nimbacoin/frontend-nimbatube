import React from "react";
import Style from "../../styles/modals/input-text.module.css";
import TextTilteInputMudum from "./TextTilteInputMudum";

const InputPassword = ({ Placeholder, Text, HandelChange, Icon }: any) => {
  return (
    <div className={Style.upload_input}>
      <TextTilteInputMudum Icon={Icon && Icon} Text={Text} />
      <label htmlFor="title" className={Style.input_label}>
        <input
          id="title"
          placeholder={Placeholder}
          onChange={HandelChange}
          type="password"
          className={Style.input_title}
        />
      </label>
    </div>
  );
};

export default InputPassword;
