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
import { useRouter } from "next/router";
const ButtonLive = () => {
  const HandelClick = () => {
    HandelDescreptionToggle();
    // document.body.style.overflow = "hidden";
  };
  const Router = useRouter();

  const [showDiv, setShowDiv] = useState(false);
  const phoneBarOpen = useSelector(
    (state: any) => state.GenrealStyle.phoneBarOpen
  );
  useEffect(() => {
    if (!phoneBarOpen) {
      document.body.style.overflow = "auto";
    }
    if (phoneBarOpen) {
      document.body.style.overflow = "hidden";
    }
  });
  const dispatch = useDispatch();
  const HandelDescreptionToggle = () => {
    dispatch(phoneBarOpenRedcuerHide());
  };
  const HandelMouseDown = () => {};
  const handelTouchMove = (e: any) => {
    setShowDiv(false);
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
  const HandelClickElemt = (ele: string) => {
    if (ele === "upload") {
      Router.push("/upload");
    } else if ("live") {
      Router.push("/go-live/go-live");
    }
    HandelClick();
  };
  return (
    <>
      {phoneBarOpen && (
        <PhoneBarOpen>
          <div className={Style.container_icons}>
            <div
              onClick={() => {
                HandelClickElemt("upload");
              }}
              className={Style.container_icon}
            >
              <div className={Style.icon}></div>
              {/* <SmallTextBlack Text={"upload"} /> */}
              <TextTilteInputMudum Text={"upload"} />
            </div>

            <div
              onClick={() => {
                HandelClickElemt("live");
              }}
              className={Style.container_icon_2}
            >
              <div className={Style.icon}></div>
              {/* <SmallTextBlack Text={"go live"} /> */}
              <TextTilteInputMudum Text={"go live"} />
            </div>
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
