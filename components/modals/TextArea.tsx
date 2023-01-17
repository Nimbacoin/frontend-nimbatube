import React, { useEffect, useState } from "react";
import Style from "../../styles/modals/input-text.module.css";
import TextTilteInputMudum from "./text/TextTilteInputMudum";

const TextArea = ({
  Placeholder,
  Text,
  HandelChange,
  Value,
  DefualtValue,
}: any) => {
  const container = React.useRef<HTMLTextAreaElement | null>(null);
  const [isIn, setIsIn] = useState(false);
  useEffect(() => {
    if (typeof DefualtValue !== "undefined") {
      setIsIn(true);
      console.log("main");
    } else {
      console.log("is undefiend");
    }
  }, [DefualtValue]);
  return (
    <div className={Style.upload_input}>
      <TextTilteInputMudum Text={Text} />
      <label htmlFor="title" className={Style.label_description}>
        {isIn ? (
          <textarea
            id="title"
            ref={container}
            // value={Value && Value}
            placeholder={Placeholder}
            onChange={HandelChange}
            className={Style.text_desc}
          >
            {DefualtValue}
          </textarea>
        ) : (
          ""
        )}
      </label>
    </div>
  );
};

export default TextArea;
