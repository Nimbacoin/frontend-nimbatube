import React, { useState, useRef } from "react";
import Style from "../../styles/modals/over-all.module.css";
import BoldText from "./BoldText";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import SkinyGrayText from "./SkinyGrayText";
import UplaodFirstStep from "./UplaodFirstStep";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import AxiosPostLogedInFormData from "../../utils/AxiosPostLogedInFormData";
import { ActionVideoDataChanging } from "../../redux/video-slice/VideoSlice";
import UplaodingAnimation from "../upload/upload-components/UplaodingAnimation";
import UplaodFirstStep2 from "./UplaodFirstStep2";
import { VscArrowLeft } from "react-icons/vsc";
import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";
import IconHeader from "./IconHeader";
import {
  elementOverLaytRedcuerHide,
  poPUppRedcuer,
} from "../../redux/style-slice/general-style/GenrealStyle";
import BlueButton from "./BlueButton";
import { socketReduxRecuder } from "../../redux/socket-slice/socketSlice";
import basedPostUrlRequestLogedIn from "../../utils/basedPostUrlRequestLogedIn";

const OverAll = ({ children }: any) => {
  return <div className={Style.container}>{children}</div>;
};

export default OverAll;
