import React from "react";
import Style from "../../styles/modals/input-text.module.css";
import TextTilteInputMudum from "./TextTilteInputMudum";

const TextArea = ({ Placeholder, Text, HandelChange }: any) => {
  return (
    <div className={Style.upload_input}>
      <TextTilteInputMudum Text={Text} />
      <label htmlFor="title" className={Style.label_description}>
        <textarea
          id="title"
          placeholder={Placeholder}
          onChange={HandelChange}
          className={Style.text_desc}
        />
      </label>
    </div>
  );
};

export default TextArea;