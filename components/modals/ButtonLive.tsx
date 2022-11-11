import React, { useState } from "react";
import Style from "../../styles/modals/button-live.module.css";
import VideoCallSharpIcon from "@mui/icons-material/VideoCallSharp";
import { FcVideoCall } from "@react-icons/all-files/fc/FcVideoCall";
import SmallTextBlack from "./SmallTextBlack";
import Link from "next/link";
const ButtonLive = () => {
  const HandelClick = () => {
    setShowDiv(!showDiv);
  };
  const [showDiv, setShowDiv] = useState(false);
  return (
    <div className={Style.wrap}>
      {showDiv && (
        <div className={Style.div_conntnt}>
          <div className={Style.container_icons}>
            <Link href="/upload">
              <div className={Style.container_icon}>
                <div className={Style.icon}></div>
                <SmallTextBlack Text={"upload"} />
              </div>
            </Link>
            <Link href="/go-live/go-live">
              <div className={Style.container_icon_2}>
                <div className={Style.icon}></div>
                <SmallTextBlack Text={"go live"} />
              </div>
            </Link>
          </div>

          <div className={Style.triangle_right}></div>
        </div>
      )}
      <button onClick={HandelClick} className={Style.button}>
        <VideoCallSharpIcon />
      </button>
    </div>
  );
};

export default ButtonLive;
