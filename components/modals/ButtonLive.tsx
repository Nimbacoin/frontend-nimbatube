import React, { useEffect, useState, useRef } from "react";
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
  const HandelMouseDown = () => {
    // setTimeout(() => {
    //   alert("df");
    // }, 2000);
    // alert("Sd")
  };
  const handelTouchMove = (e: any) => {
    console.log("move");
    const ggg = e.targetTouches[0].clientX;
    const gggy = e.targetTouches[0].clientY;
    if (buttonRef.current) {
      buttonRef.current.style.position = "fixed";
      buttonRef.current.style.left = ggg + "px";
      buttonRef.current.style.top = gggy + "px";
    }
    // functionToChangeTime(e);
  };
  const mainContainerRef = React.useRef<HTMLDivElement | null>(null);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  return (
    <div ref={mainContainerRef} className={Style.wrap}>
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
      <button
        onMouseDown={HandelMouseDown}
        onClick={HandelClick}
        onTouchMove={handelTouchMove}
        ref={buttonRef}
        className={Style.button}
      >
        <VideoCallSharpIcon />
      </button>
    </div>
  );
};

export default ButtonLive;
