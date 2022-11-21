import React, { useEffect, useState, useRef } from "react";
import Style from "../../styles/modals/button-live.module.css";
import VideoCallSharpIcon from "@mui/icons-material/VideoCallSharp";
import { FcVideoCall } from "@react-icons/all-files/fc/FcVideoCall";
import SmallTextBlack from "./SmallTextBlack";
import Link from "next/link";
import GoLiveOption from "./GoLiveOption";
import PhoneBarOpen from "./PhoneBarOpen";
import { useDispatch, useSelector } from "react-redux";
import { phoneBarOpenRedcuerHide } from "../../redux/style-slice/general-style/GenrealStyle";
import TextTilteInputMudum from "./text/TextTilteInputMudum";
const ButtonLive = () => {
  const HandelClick = () => {
    setShowDiv(!showDiv);
    HandelDescreptionToggle();
    document.body.style.overflow = "hidden";
  };

  const [showDiv, setShowDiv] = useState(false);
  const phoneBarOpen = useSelector(
    (state: any) => state.GenrealStyle.phoneBarOpen
  );
  const dispatch = useDispatch();
  const HandelDescreptionToggle = () => {
    dispatch(phoneBarOpenRedcuerHide());
  };
  const HandelMouseDown = () => {};
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
      animatedRef.current.style.right = animatedRefFixed.current.style.right;
      animatedRef.current.style.top = animatedRefFixed.current.style.top;
      const ifrstt = animatedRefFixed.current;
      document.body.style.overflow = "auto";
    }
  };

  const mainContainerRef = React.useRef<HTMLDivElement | null>(null);
  const animatedRef = React.useRef<HTMLDivElement | null>(null);
  const animatedRefFixed = React.useRef<HTMLDivElement | null>(null);
  return (
    <>
      {phoneBarOpen && (
        <PhoneBarOpen>
          <div className={Style.container_icons}>
            <Link href="/upload">
              <div className={Style.container_icon}>
                <div className={Style.icon}></div>
                {/* <SmallTextBlack Text={"upload"} /> */}
                <TextTilteInputMudum Text={"upload"} />
              </div>
            </Link>
            <Link href="/go-live/go-live">
              <div className={Style.container_icon_2}>
                <div className={Style.icon}></div>
                {/* <SmallTextBlack Text={"go live"} /> */}
                <TextTilteInputMudum Text={"go live"} />
              </div>
            </Link>
          </div>
        </PhoneBarOpen>
      )}
      <div ref={mainContainerRef} className={Style.wrap}>
        {/* <GoLiveOption /> */}
        {/* {showDiv && (
          
        )} */}
        <div ref={animatedRefFixed} className={Style.button_container}>
          <div
            onMouseDown={HandelMouseDown}
            onClick={HandelClick}
            onTouchMove={handelTouchMove}
            ref={animatedRef}
            onTouchEnd={handelonTouchEnd}
            className={Style.div_container_button}
          >
            <div className={Style.button}>
              <VideoCallSharpIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ButtonLive;
