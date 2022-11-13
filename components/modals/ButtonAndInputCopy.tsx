import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { poPUppRedcuer } from "../../redux/style-slice/general-style/GenrealStyle";
import Style from "../../styles/modals/input-file.module.css";
import TextTilteInputMudum from "./TextTilteInputMudum";

const ButtonAndInputAction = ({
  CopyValue,
  HandelClick,
  ButtonTextValue,
  Text,
  Icon,
}: any) => {
  const { asPath } = useRouter();
  const dispatch = useDispatch();

  return (
    <div className={Style.container}>
      <TextTilteInputMudum Icon={Icon && Icon} Text={Text && Text} />
      <div className={Style.link_container}>
        <input
          value={CopyValue.length ? CopyValue : null}
          className={Style.main_link_container}
        />
        <button onClick={HandelClick} className={Style.button_copy}>
          {ButtonTextValue ? ButtonTextValue : "Copy"}
        </button>
      </div>
    </div>
  );
};

export default ButtonAndInputAction;
