rafceimport React, { useEffect, useState, useRef } from "react";
import Style from "../../styles/modals/button-live.module.css";
import VideoCallSharpIcon from "@mui/icons-material/VideoCallSharp";
import { FcVideoCall } from "@react-icons/all-files/fc/FcVideoCall";
import SmallTextBlack from "./SmallTextBlack";
import Link from "next/link";
import { useState } from "react";
// import GoLiveOption from "./GoLiveOption";
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
    setShowDiv(false);
    console.log("move");
    const ggg = e.targetTouches[0].clientX;
    const gggy = e.targetTouches[0].clientY;
    if (
      animatedRef.current &&
      animatedRefFixed.current &&
      mainContainerRef.current
    ) {
      document.body.style.overflow = "hidden";
      animatedRef.current.style.position = "fixed";
      animatedRef.current.style.left = ggg + "px";
      animatedRef.current.style.top = gggy + "px";
      mainContainerRef.current.style.left =
        ggg - mainContainerRef.current.offsetWidth + 40 + "px";
      mainContainerRef.current.style.top = gggy + "px";
    }
    // functionToChangeTime(e);
  };
  const handelonTouchEnd = (e: any) => {
    console.log("end");
    // functionToChangeTime(e.targetTouches[0].clientX);

    if (
      mainContainerRef.current &&
      animatedRef.current &&
      animatedRefFixed.current
    ) {
      // document.body.style.position = "static";
      animatedRef.current.style.right = animatedRefFixed.current.style.right;
      animatedRef.current.style.top = animatedRefFixed.current.style.top;
      const ifrstt = animatedRefFixed.current;
      document.body.style.overflow = "auto";

      // animatedRef.current.style.position = "relative";

      // const ggg = animatedRefFixed.current.style.top;
      // const gggy = animatedRefFixed.current.style.left;
      // animatedRef.current.style.left = ggg;
      // animatedRef.current.style.top = gggy;
      // functionToChangeTime(e);
    }
  };

  const mainContainerRef = React.useRef<HTMLDivElement | null>(null);
  const animatedRef = React.useRef<HTMLDivElement | null>(null);
  const animatedRefFixed = React.useRef<HTMLDivElement | null>(null);
  return (
    <div ref={mainContainerRef} className={Style.wrap}>
      
    </div>
  );
};

export default ButtonLive;
