import React from "react";
import Style from "../../styles/modals/button-live.module.css";
import VideoCallSharpIcon from "@mui/icons-material/VideoCallSharp";
import { FcVideoCall } from "@react-icons/all-files/fc/FcVideoCall";
import SmallTextBlack from "./SmallTextBlack";
const ButtonLive = () => {
  const HandelClick = () => {};

  return (
    <div onClick={HandelClick} className={Style.wrap}>
      <div className={Style.div_conntnt}>
        <div className={Style.container_icons}>
          <div className={Style.container_icon}>
            <div className={Style.icon}></div>
            <SmallTextBlack Text={"upload"} />
          </div>
          <div className={Style.container_icon_2}>
            <div className={Style.icon}></div>
            <SmallTextBlack Text={"go live"} />
          </div>
        </div>
        <div className={Style.triangle_right}></div>
      </div>
      <button className={Style.button}>
        <VideoCallSharpIcon />
      </button>
    </div>
  );
};

export default ButtonLive;
