import React from "react";
import Style from "../../styles/modals/input-text.module.css";
import TextTilteInputMudum from "./text/TextTilteInputMudum";

const InputText = ({
  Placeholder,
  Text,
  HandelChange,
  Number,
  Icon,
  Value,
  DefualtValue,
}: any) => {
  return (
    <div className={Style.upload_input}>
      <TextTilteInputMudum Icon={Icon && Icon} Text={Text} />
      <label htmlFor="title" className={Style.input_label}>
        {DefualtValue?.length >= 1 ? (
          <input
            id="title"
            defaultValue={DefualtValue}
            placeholder={Placeholder}
            onChange={HandelChange}
            type={Number ? "number" : "text"}
            className={Style.input_title}
          />
        ) : (
          <input
            id="title"
            defaultValue={DefualtValue}
            placeholder={Placeholder}
            onChange={HandelChange}
            type={Number ? "number" : "text"}
            className={Style.input_title}
          />
        )}
      </label>
    </div>
  );
};

export default InputText;
