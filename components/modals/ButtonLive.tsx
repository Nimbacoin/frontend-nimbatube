import React from "react";
import Style from "../../styles/modals/button-live.module.css";
import VideoCallSharpIcon from "@mui/icons-material/VideoCallSharp";
const ButtonLive = () => {
  const HandelClick = () => {};
  return (
    <div onClick={HandelClick} className={Style.wrap}>
      <button className={Style.button}>
        <VideoCallSharpIcon />
      </button>
    </div>
  );
};

export default ButtonLive;
