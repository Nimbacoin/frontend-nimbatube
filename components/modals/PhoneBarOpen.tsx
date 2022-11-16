import React, { useEffect, useState, useRef } from "react";
import Style from "../../styles/modals/phone-bar-open.module.css";
import VideoCallSharpIcon from "@mui/icons-material/VideoCallSharp";
import { FcVideoCall } from "@react-icons/all-files/fc/FcVideoCall";
import SmallTextBlack from "./SmallTextBlack";
import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";

import Link from "next/link";

const PhoneBarOpen = ({ children }: any) => {
  return (
    <div className={Style.container_phone}>
      <div
        // onTouchMove={HandelDescreptionToggle}
        className={Style.container_descreption_phone}
      >
        <div className={Style.close_rect}></div>
        <div className={Style.phone_desc_container}>
          <span className={Style.descreption}>Create</span>
          <button
            // onClick={HandelDescreptionToggle}
            className={Style.close_button}
          >
            <IoCloseOutline />
          </button>
        </div>
      </div>
      {children && children}
    </div>
  );
};

export default PhoneBarOpen;
