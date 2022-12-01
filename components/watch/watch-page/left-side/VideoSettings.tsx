import React, { useEffect, useRef, useState } from "react";
import Style from "../../../../styles/pages/watch/leftside/video-settings.module.css";
import { v4 as uuid } from "uuid";
import { AiOutlineLike } from "@react-icons/all-files/ai/AiOutlineLike";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import basedGetUrlRequestLogedIn from "../../../../utils/basedGetUrlRequestLogedIn";
import basedPostUrlRequestLogedIn from "../../../../utils/basedPostUrlRequestLogedIn";
import { IoPlaySkipBack } from "@react-icons/all-files/io5/IoPlaySkipBack";
import { IoPlaySkipForward } from "@react-icons/all-files/io5/IoPlaySkipForward";
import { IoPauseSharp } from "@react-icons/all-files/io5/IoPauseSharp";
import { BiFullscreen } from "@react-icons/all-files/bi/BiFullscreen";
import { IoVolumeMedium } from "@react-icons/all-files/io5/IoVolumeMedium";
import { IoVolumeMute } from "@react-icons/all-files/io5/IoVolumeMute";
import { IoPlay } from "@react-icons/all-files/io5/IoPlay";
import LaodingCirculOne from "../../../modals/LaodingCirculOne";
import GoogleIcon from "../../../modals/GoogleIcon";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseSharpIcon from "@mui/icons-material/PauseSharp";
import { IoIosPause } from "@react-icons/all-files/io/IoIosPause";
import SkipNextSharpIcon from "@mui/icons-material/SkipNextSharp";
import SkipPreviousSharpIcon from "@mui/icons-material/SkipPreviousSharp";
import VolumeOffSharpIcon from "@mui/icons-material/VolumeOffSharp";
import VolumeUpSharpIcon from "@mui/icons-material/VolumeUpSharp";
import Slider, { SliderProps } from "@mui/material/Slider";
import VideoBar from "./VideoBar";
import VideoTimeReader from "../../../../utils/VideoTimeReader";
import VideoTimeReaderChanging from "../../../../utils/VideoTimeReaderChanging";
import SoundBar from "./SoundBar";
import Crop32SharpIcon from "@mui/icons-material/Crop32Sharp";
import CropFreeSharpIcon from "@mui/icons-material/CropFreeSharp";
import SettingsSharpIcon from "@mui/icons-material/VideoSettingsSharp";
import Crop75SharpIcon from "@mui/icons-material/Crop75Sharp";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
const VideoSettings = () => {
  return (
    <div className={Style.container}>
      <div className={Style.container_div_top}>
        <div className={Style.div_top}></div>
      </div>
      <div className={Style.container_div_bottom}></div>
    </div>
  );
};

export default VideoSettings;
