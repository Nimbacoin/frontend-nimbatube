import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { poPUppRedcuer } from "../../redux/style-slice/general-style/GenrealStyle";
import Style from "../../styles/modals/input-file.module.css";
import SmallTextBlack from "./SmallTextBlack";
import TextTilteInputMudum from "./TextTilteInputMudum";

const FileUplaodInputAction = ({
  CopyValue,
  HandelClick,
  ButtonTextValue,
  Text,
  Icon,
  Accept,
  handelSubmiteFile,
}: any) => {
  const { asPath } = useRouter();
  const dispatch = useDispatch();
  const readImageThumbnail = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      handelSubmiteFile(event.target.files[0]);
    }
  };

  const inputTag1 = React.useRef<HTMLInputElement | null>(null);
  const inputTag2 = React.useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    console.log(inputTag2);
  });
  return (
    <div className={Style.container}>
      <TextTilteInputMudum Icon={Icon && Icon} Text={Text && Text} />
      <label
        htmlFor="input_upload_FileUplaodInputAction"
        className={Style.link_container}
      >
        <div className={Style.div_container_text}>
          <SmallTextBlack Text={CopyValue ? CopyValue : "uplaod"} />
        </div>
        <input
          ref={inputTag2}
          id="input_upload_FileUplaodInputAction"
          type="file"
          // accept={"image/png, image/gif, image/jpeg , image/jpg image/jfif image/svg"}
          onChange={readImageThumbnail}
          value={CopyValue ? CopyValue : null}
          className={Style.hidden}
          style={{ display: "none" }}
        />
        <span className={Style.button_copy}>
          {ButtonTextValue ? ButtonTextValue : "Copy"}
        </span>
      </label>
    </div>
  );
};

export default FileUplaodInputAction;
