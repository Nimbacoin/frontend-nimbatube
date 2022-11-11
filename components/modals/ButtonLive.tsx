import React from "react";
import Style from "../../styles/modals/button-live.module.css";
import VideoCallSharpIcon from "@mui/icons-material/VideoCallSharp";
import {FcVideoCall} from "@react-icons/all-files/fc/FcVideoCall";
const ButtonLive = () => {
  const HandelClick = () => {};
  return (
    <div onClick={HandelClick} className={Style.wrap}>
      <div className={Style.div_conntnt}>
        <div className={Style.container_icons}>
             <FcVideoCall />
        </div>
        <div className={Style.triangle_right}>
        
         
        </div>
      </div>
      <button className={Style.button}>
        <VideoCallSharpIcon />
      </button>
    </div>
  );
};

export default ButtonLive;
