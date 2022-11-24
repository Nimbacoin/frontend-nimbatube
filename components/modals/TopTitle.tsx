import React from "react";
import { IoVideocamOutline } from "@react-icons/all-files/io5/IoVideocamOutline";
import Style from "../../styles/modals/top-title.module.css";
import NormalText from "./NormalText";
import TextTilteInputMudum from "./text/TextTilteInputMudum";
import BlueButton from "./BlueButton";
const TopTitle = ({
  Icon,
  Text,
  ButtonRight,
  HandelClickBButton,
  TextBlueButton,
}: any) => {
  return (
    <div className={Style.upload_container}>
      <div className={Style.container_elements}>
        <div className={Style.container_left_side}>
          {Icon && Icon}
          {Text && <TextTilteInputMudum Text={Text} />}
        </div>
        {ButtonRight && (
          <div className={Style.container_right_side}>
            <BlueButton
              HandelClick={HandelClickBButton}
              Text={TextBlueButton}
            />
          </div>
        )}
      </div>
      <div className={Style.border_div}></div>
    </div>
  );
};

export default TopTitle;
